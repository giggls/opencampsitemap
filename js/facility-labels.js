/* Accessible facility labels and tooltips for campsite details. */

(function () {
  'use strict';

  const STORAGE_KEY = 'open-camping-map-show-facility-labels';
  const HOVER_DISMISS_DELAY = 300;
  let currentController = null;

  function readLabelPreference() {
    try {
      const storedPreference = window.localStorage.getItem(STORAGE_KEY);
      return storedPreference === null ? true : storedPreference === 'true';
    } catch (error) {
      return true;
    }
  }

  function storeLabelPreference(showLabels) {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(showLabels));
    } catch (error) {
      // The preference still works for this session if storage is unavailable.
    }
  }

  function createTooltip() {
    const tooltip = document.createElement('div');
    const caret = document.createElement('span');
    const text = document.createElement('span');

    tooltip.className = 'site-facility-tooltip site-facility-tooltip--bottom';
    tooltip.setAttribute('aria-hidden', 'true');
    tooltip.hidden = true;

    caret.className = 'site-facility-tooltip__caret';
    caret.setAttribute('aria-hidden', 'true');
    text.className = 'site-facility-tooltip__text';

    tooltip.appendChild(caret);
    tooltip.appendChild(text);
    document.body.appendChild(tooltip);

    return {
      element: tooltip,
      text: text
    };
  }

  function createFacilityLabelController(section) {
    const list = section.querySelector('.site-facility-list');
    const toggle = section.querySelector('.facility-label-toggle__input');
    const status = section.querySelector('.site-facilities__status');
    const triggers = Array.from(section.querySelectorAll('.site-facility-trigger'));
    const tooltip = createTooltip();
    const removeListeners = [];
    let resizeObserver = null;
    let hoverDismissTimer = null;
    let showLabels = true;
    let hoveredTrigger = null;
    let focusedTrigger = null;
    let pinnedTrigger = null;

    function listen(target, eventName, handler, options) {
      target.addEventListener(eventName, handler, options);
      removeListeners.push(function () {
        target.removeEventListener(eventName, handler, options);
      });
    }

    function labelForTrigger(trigger) {
      return trigger.parentElement.querySelector('.site-facility-label');
    }

    function cancelHoverDismissal() {
      if (hoverDismissTimer !== null) {
        window.clearTimeout(hoverDismissTimer);
        hoverDismissTimer = null;
      }
    }

    function activeTrigger() {
      return pinnedTrigger || focusedTrigger || hoveredTrigger;
    }

    function positionTooltip(trigger) {
      if (tooltip.element.hidden) return;

      const triggerRect = trigger.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const edgeMargin = 8;
      const tooltipGap = 10;
      const boundaryLeft = Math.max(sectionRect.left, edgeMargin);
      const boundaryRight = Math.min(sectionRect.right, window.innerWidth - edgeMargin);
      const availableWidth = Math.max(1, boundaryRight - boundaryLeft);

      tooltip.element.style.maxWidth = Math.min(390, availableWidth) + 'px';

      const tooltipWidth = tooltip.element.offsetWidth;
      const tooltipHeight = tooltip.element.offsetHeight;
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      const maximumLeft = Math.max(boundaryLeft, boundaryRight - tooltipWidth);
      const left = Math.min(
        Math.max(triggerCenter - tooltipWidth / 2, boundaryLeft),
        maximumLeft
      );
      const caretLeft = Math.min(
        Math.max(triggerCenter - left, 14),
        tooltipWidth - 14
      );
      const fitsBelow = (
        triggerRect.bottom + tooltipGap + tooltipHeight + edgeMargin
        <= window.innerHeight
      );
      const fitsAbove = (
        triggerRect.top - tooltipGap - tooltipHeight >= edgeMargin
      );
      const placement = fitsBelow || !fitsAbove ? 'bottom' : 'top';
      const top = placement == 'bottom'
        ? triggerRect.bottom + tooltipGap
        : triggerRect.top - tooltipHeight - tooltipGap;
      const isVisible = (
        triggerRect.bottom > 0
        && triggerRect.top < window.innerHeight
        && triggerRect.right > boundaryLeft
        && triggerRect.left < boundaryRight
      );

      tooltip.element.classList.toggle(
        'site-facility-tooltip--bottom',
        placement == 'bottom'
      );
      tooltip.element.classList.toggle(
        'site-facility-tooltip--top',
        placement == 'top'
      );
      tooltip.element.style.setProperty(
        '--site-facility-tooltip-caret-left',
        caretLeft + 'px'
      );
      tooltip.element.style.left = left + 'px';
      tooltip.element.style.top = top + 'px';
      tooltip.element.style.visibility = isVisible ? 'visible' : 'hidden';
    }

    function renderTooltip() {
      const trigger = showLabels ? null : activeTrigger();

      triggers.forEach(function (candidate) {
        const isActive = candidate === trigger;
        candidate.parentElement.classList.toggle('is-active', isActive);

        if (!showLabels) {
          candidate.setAttribute(
            'aria-pressed',
            candidate === pinnedTrigger ? 'true' : 'false'
          );
        }
      });

      if (trigger === null) {
        tooltip.element.hidden = true;
        return;
      }

      tooltip.text.textContent = labelForTrigger(trigger).textContent;
      tooltip.element.hidden = false;
      tooltip.element.style.visibility = 'hidden';
      positionTooltip(trigger);
    }

    function dismissTooltip() {
      cancelHoverDismissal();
      hoveredTrigger = null;
      focusedTrigger = null;
      pinnedTrigger = null;
      renderTooltip();
    }

    function dismissHoverSoon() {
      cancelHoverDismissal();
      hoverDismissTimer = window.setTimeout(function () {
        hoveredTrigger = null;
        hoverDismissTimer = null;
        renderTooltip();
      }, HOVER_DISMISS_DELAY);
    }

    function pinTrigger(trigger) {
      if (pinnedTrigger === trigger) {
        dismissTooltip();
        return;
      }

      cancelHoverDismissal();
      pinnedTrigger = trigger;
      renderTooltip();
    }

    function setLabelMode(labelsShouldShow, announce) {
      showLabels = labelsShouldShow;
      toggle.checked = showLabels;
      section.classList.toggle('site-facilities--compact', !showLabels);
      list.classList.toggle('site-facility-list--labeled', showLabels);

      dismissTooltip();

      triggers.forEach(function (trigger) {
        const label = labelForTrigger(trigger);

        label.hidden = !showLabels;

        if (showLabels) {
          trigger.removeAttribute('aria-label');
          trigger.removeAttribute('aria-pressed');
          trigger.removeAttribute('role');
          trigger.removeAttribute('tabindex');
        } else {
          trigger.setAttribute('aria-label', label.textContent);
          trigger.setAttribute('aria-pressed', 'false');
          trigger.setAttribute('role', 'button');
          trigger.setAttribute('tabindex', '0');
        }
      });

      if (announce) {
        status.textContent = showLabels
          ? section.dataset.labelsShown
          : section.dataset.labelsHidden;
      }
    }

    triggers.forEach(function (trigger) {
      listen(trigger, 'pointerenter', function (event) {
        if (showLabels || event.pointerType == 'touch') return;
        cancelHoverDismissal();
        hoveredTrigger = trigger;
        renderTooltip();
      });

      listen(trigger, 'pointerleave', function (event) {
        if (showLabels || event.pointerType == 'touch') return;
        dismissHoverSoon();
      });

      listen(trigger, 'focus', function () {
        if (showLabels) return;
        cancelHoverDismissal();
        focusedTrigger = trigger;
        renderTooltip();
      });

      listen(trigger, 'blur', function () {
        if (focusedTrigger === trigger) {
          focusedTrigger = null;
          renderTooltip();
        }
      });

      listen(trigger, 'click', function () {
        if (!showLabels) pinTrigger(trigger);
      });

      listen(trigger, 'keydown', function (event) {
        if (showLabels) return;
        if (event.key == 'Enter' || event.key == ' ') {
          event.preventDefault();
          pinTrigger(trigger);
        }
      });
    });

    listen(tooltip.element, 'pointerenter', cancelHoverDismissal);
    listen(tooltip.element, 'pointerleave', dismissHoverSoon);

    listen(toggle, 'change', function () {
      const labelsShouldShow = toggle.checked;
      storeLabelPreference(labelsShouldShow);
      setLabelMode(labelsShouldShow, true);
    });

    listen(document, 'keydown', function (event) {
      if (event.key == 'Escape' && activeTrigger() !== null) {
        dismissTooltip();
      }
    });

    listen(document, 'pointerdown', function (event) {
      if (
        pinnedTrigger !== null
        && !list.contains(event.target)
        && !tooltip.element.contains(event.target)
      ) {
        dismissTooltip();
      }
    });

    listen(window, 'resize', function () {
      const trigger = activeTrigger();
      if (!showLabels && trigger !== null) positionTooltip(trigger);
    });

    listen(document, 'scroll', function () {
      const trigger = activeTrigger();
      if (!showLabels && trigger !== null) positionTooltip(trigger);
    }, true);

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(function () {
        const trigger = activeTrigger();
        if (!showLabels && trigger !== null) positionTooltip(trigger);
      });
      resizeObserver.observe(section);
      resizeObserver.observe(tooltip.element);
    }

    setLabelMode(readLabelPreference(), false);

    return {
      destroy: function () {
        cancelHoverDismissal();
        removeListeners.forEach(function (removeListener) {
          removeListener();
        });
        if (resizeObserver !== null) resizeObserver.disconnect();
        tooltip.element.remove();
      }
    };
  }

  function initializeFacilityLabels(root) {
    if (currentController !== null) {
      currentController.destroy();
      currentController = null;
    }

    const searchRoot = root || document;
    const section = searchRoot.matches
      && searchRoot.matches('[data-facility-labels]')
      ? searchRoot
      : searchRoot.querySelector('[data-facility-labels]');

    if (section !== null) {
      currentController = createFacilityLabelController(section);
    }
  }

  window.initializeFacilityLabels = initializeFacilityLabels;

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initializeFacilityLabels(document);
    }, { once: true });
  } else {
    initializeFacilityLabels(document);
  }
}());
