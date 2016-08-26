'use strict';

(function () {
  'use strict';

  Polymer.CascadedAnimationBehaviorImpl = {

    properties: {
      selector: {
        value: '[cascaded]'
      },
      showing: {
        type: Boolean,
        observer: '_showingChanged'
      },
      animationConfig: {
        type: Object,
        value: function value() {
          return {
            'entry': [{
              name: 'cascaded-animation',
              animation: 'transform-animation',
              transformFrom: 'translate3d(0,100%,0)',
              transformTo: 'none',
              timing: {
                delay: 0
              }
            }, {
              name: 'cascaded-animation',
              animation: 'fade-in-animation',
              timing: {
                delay: 0
              }
            }]
          };
        }
      }
    },

    attached: function attached() {
      this.style.opacity = 0;
      this._updateCascadedNodes();
    },

    _showingChanged: function _showingChanged(showing) {
      if (showing) {
        this.async(function () {
          this.style.opacity = 1;
        }, 100);
        this.playAnimation('entry');
      } else {
        this.style.opacity = 0;
      }
    },

    _updateCascadedNodes: function _updateCascadedNodes() {
      var nodes = Polymer.dom(this.root).querySelectorAll(this.selector);
      var entry = this.animationConfig.entry;
      entry[0].nodes = entry[1].nodes = Array.prototype.slice.call(nodes);
    }

  };

  Polymer.CascadedAnimationBehavior = [Polymer.NeonAnimatableBehavior, Polymer.NeonAnimationRunnerBehavior, Polymer.CascadedAnimationBehaviorImpl];
})();