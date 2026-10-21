/* ============================================
   TIMECRAFT — Theme JavaScript
   Mobile menu, sticky header, cart AJAX, sab vanilla JS
   jQuery ki zaroorat nahi!
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----- Mobile Menu Toggle ----- */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuOverlay = document.querySelector('[data-menu-overlay]');
  const menuClose = document.querySelector('[data-menu-close]');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('is-open');
    if (menuOverlay) menuOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden'; // scroll band karo
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    if (menuOverlay) menuOverlay.classList.remove('is-visible');
    document.body.style.overflow = ''; // scroll wapas chalu
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', openMobileMenu);
  }

  if (menuClose) {
    menuClose.addEventListener('click', closeMobileMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
  }

  /* ----- Sticky Header Scroll Behavior ----- */
  const header = document.querySelector('.header');

  if (header) {
    // Jab user scroll kare, header par shadow add karo
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 10) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* ----- Announcement Bar Close ----- */
  const announcementClose = document.querySelector('[data-announcement-close]');
  const announcementBar = document.querySelector('.announcement-bar');

  if (announcementClose && announcementBar) {
    announcementClose.addEventListener('click', function () {
      announcementBar.classList.add('is-hidden');
      // Session mein yaad rakhne ke liye
      try {
        sessionStorage.setItem('announcement-closed', 'true');
      } catch (e) {
        // Storage available nahi hai, koi baat nahi
      }
    });

    // Agar pehle band kiya tha, toh hidden rakho
    try {
      if (sessionStorage.getItem('announcement-closed') === 'true') {
        announcementBar.classList.add('is-hidden');
      }
    } catch (e) {
      // Ignore
    }
  }

  /* ----- Add to Cart (AJAX) ----- */
  document.addEventListener('submit', function (e) {
    const form = e.target.closest('[data-add-to-cart-form]');
    if (!form) return;

    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;

    // Button disable karo aur loading text dikhao
    submitBtn.disabled = true;
    submitBtn.textContent = 'Adding...';

    const formData = new FormData(form);

    fetch('/cart/add.js', {
      method: 'POST',
      body: formData
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Cart mein add nahi ho saka');
      }
      return response.json();
    })
    .then(function (data) {
      // Success - button text update karo briefly
      submitBtn.textContent = 'Added!';
      updateCartCount();

      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    })
    .catch(function (error) {
      console.error('Add to cart error:', error);
      submitBtn.textContent = 'Error';

      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  });

  /* ----- Cart Quantity Update (AJAX) ----- */
  document.addEventListener('click', function (e) {
    const quantityBtn = e.target.closest('[data-quantity-change]');
    if (!quantityBtn) return;

    const lineItem = quantityBtn.closest('[data-cart-item]');
    if (!lineItem) return;

    const lineIndex = lineItem.getAttribute('data-line');
    const input = lineItem.querySelector('[data-quantity-input]');
    const currentQty = parseInt(input.value) || 1;
    const change = quantityBtn.getAttribute('data-quantity-change');
    let newQty = currentQty;

    // Plus ya minus karo
    if (change === 'plus') {
      newQty = currentQty + 1;
    } else if (change === 'minus') {
      newQty = Math.max(0, currentQty - 1);
    }

    // Quantity 0 ho toh item remove ho jayega
    input.value = newQty;

    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        line: parseInt(lineIndex),
        quantity: newQty
      })
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (cart) {
      updateCartCount(cart.item_count);
      // Agar quantity 0 ho gayi, item hata do page se
      if (newQty === 0) {
        lineItem.remove();
        updateCartTotals(cart);
      } else {
        updateCartTotals(cart);
      }
    })
    .catch(function (error) {
      console.error('Quantity update error:', error);
      input.value = currentQty; // wapas purani value rakh do
    });
  });

  /* ----- Cart Count Badge Update ----- */
  function updateCartCount(count) {
    const badges = document.querySelectorAll('[data-cart-count]');

    if (typeof count !== 'undefined') {
      badges.forEach(function (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      });
      return;
    }

    // Count nahi diya toh cart se fetch karo
    fetch('/cart.js')
    .then(function (response) {
      return response.json();
    })
    .then(function (cart) {
      badges.forEach(function (badge) {
        badge.textContent = cart.item_count;
        badge.style.display = cart.item_count > 0 ? 'flex' : 'none';
      });
    })
    .catch(function (error) {
      console.error('Cart count fetch error:', error);
    });
  }

  /* ----- Cart Totals Update (after quantity change) ----- */
  function updateCartTotals(cart) {
    const subtotalEl = document.querySelector('[data-cart-subtotal]');
    const totalEl = document.querySelector('[data-cart-total]');

    if (subtotalEl) {
      subtotalEl.textContent = formatMoney(cart.total_price);
    }
    if (totalEl) {
      totalEl.textContent = formatMoney(cart.total_price);
    }

    // Agar cart empty ho gaya, page reload karo
    if (cart.item_count === 0) {
      window.location.reload();
    }
  }

  /* ----- Money Format Helper ----- */
  function formatMoney(cents) {
    // Shopify cents mein price deta hai, rupees mein convert karo
    return 'Rs. ' + (cents / 100).toLocaleString('en-PK');
  }

  /* ==========================================================================
     Shared Live Horological Ticker — Rawalpindi Time (Asia/Karachi)
     Yahan har analog watch visual ka live waqt update hota hai
     ========================================================================== */
  function initLiveWatchClocks() {
    const clockSelectors = '[data-live-clock], [data-header-clock], .hero-watch-svg, .watch-artwork-svg, .category-svg';

    // Rawalpindi (Asia/Karachi) ka sahi waqt hasil karo
    function getRawalpindiTime() {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false
        });
        const parts = formatter.formatToParts(now);
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        for (let i = 0; i < parts.length; i++) {
          if (parts[i].type === 'hour') hours = parseInt(parts[i].value, 10);
          if (parts[i].type === 'minute') minutes = parseInt(parts[i].value, 10);
          if (parts[i].type === 'second') seconds = parseInt(parts[i].value, 10);
        }

        return { hours: hours % 24, minutes: minutes, seconds: seconds };
      } catch (err) {
        // Fallback: Pakistan Standard Time hamesha UTC+5 hota hai
        const now = new Date();
        const utcHours = now.getUTCHours();
        const utcMinutes = now.getUTCMinutes();
        const utcSeconds = now.getUTCSeconds();
        return {
          hours: (utcHours + 5) % 24,
          minutes: utcMinutes,
          seconds: utcSeconds
        };
      }
    }

    // Suian (hands) ki accurate analog angles calculate karo
    function updateAllWatches() {
      const time = getRawalpindiTime();

      // Second hand: 6 degrees per second
      const secondAngle = time.seconds * 6;

      // Minute hand: 6 degrees per minute + seconds ka hisaab (0.1 deg/sec)
      const minuteAngle = (time.minutes * 6) + (time.seconds * 0.1);

      // Hour hand: 30 degrees per hour + minutes ka hisaab (0.5 deg/min) + seconds (0.5/60 deg/sec)
      const hourAngle = ((time.hours % 12) * 30) + (time.minutes * 0.5) + (time.seconds * (0.5 / 60));

      const clockElements = document.querySelectorAll(clockSelectors);
      if (!clockElements.length) return;

      clockElements.forEach(function (clockEl) {
        // Center pivot maloom karo
        let cx = 100;
        let cy = 100;

        const customPivot = clockEl.getAttribute('data-clock-pivot');
        if (customPivot) {
          const parts = customPivot.trim().split(/\s+|,/);
          if (parts.length >= 2) {
            cx = parseFloat(parts[0]);
            cy = parseFloat(parts[1]);
          }
        } else if (clockEl.hasAttribute('data-header-clock') || clockEl.classList.contains('header-clock-emblem')) {
          cx = 16;
          cy = 16;
        } else if (clockEl.classList.contains('hero-watch-svg')) {
          cx = 160;
          cy = 160;
        } else if (clockEl.classList.contains('category-svg')) {
          cx = 140;
          cy = 175;
        } else if (clockEl.viewBox && clockEl.viewBox.baseVal && clockEl.viewBox.baseVal.width) {
          cx = clockEl.viewBox.baseVal.width / 2;
          cy = clockEl.viewBox.baseVal.height / 2;
        }

        const hourHands = clockEl.querySelectorAll('.clock-hand--hour');
        const minuteHands = clockEl.querySelectorAll('.clock-hand--minute');
        const secondHands = clockEl.querySelectorAll('.clock-hand--second');

        const hourTransform = 'rotate(' + hourAngle.toFixed(2) + ' ' + cx + ' ' + cy + ')';
        const minuteTransform = 'rotate(' + minuteAngle.toFixed(2) + ' ' + cx + ' ' + cy + ')';
        const secondTransform = 'rotate(' + secondAngle.toFixed(2) + ' ' + cx + ' ' + cy + ')';

        const originCss = cx + 'px ' + cy + 'px';
        const hourCss = 'rotate(' + hourAngle.toFixed(2) + 'deg)';
        const minuteCss = 'rotate(' + minuteAngle.toFixed(2) + 'deg)';
        const secondCss = 'rotate(' + secondAngle.toFixed(2) + 'deg)';

        hourHands.forEach(function (hand) {
          hand.setAttribute('transform', hourTransform);
          hand.style.transformOrigin = originCss;
          hand.style.transform = hourCss;
        });

        minuteHands.forEach(function (hand) {
          hand.setAttribute('transform', minuteTransform);
          hand.style.transformOrigin = originCss;
          hand.style.transform = minuteCss;
        });

        secondHands.forEach(function (hand) {
          hand.setAttribute('transform', secondTransform);
          hand.style.transformOrigin = originCss;
          hand.style.transform = secondCss;
        });
      });
    }

    // Page load hotay hi foran waqt set karo
    updateAllWatches();

    // Har second clock update karo
    setInterval(updateAllWatches, 1000);

    // Jab user background tab se wapas aaye toh sync karo
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) {
        updateAllWatches();
      }
    });
  }

  /* ==========================================================================
     Scroll Reveal & Stagger Animation
     Yahan sections aur product cards ka scroll reveal trigger hota hai
     ========================================================================== */
  function initScrollReveals() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll('.reveal-on-scroll, .reveal-stagger-parent');

    if (!revealTargets.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(function (el) {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    };

    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Ek baar reveal hone ke baad unobserve karo
        }
      });
    }, observerOptions);

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // Initializations
  initLiveWatchClocks();
  initScrollReveals();

});
