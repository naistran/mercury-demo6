var hg = require('mercury');
var h = hg.h;
var Item = require('./item');

function App() {
  var state = hg.struct({
    items: hg.array([]),
    handles: hg.value(null)
  });

  state.handles.set(hg.handles({
    addItem: function addItem(state) {
      state.items.push(Item());
    },
    addManyItems: function addManyItems(state) {
      for (var i = 0; i < 1000; i++) {
        state.items.push(Item());
      }
    }
  }, state));

  return state;
}

App.render = function render(state) {
  var items = state.items.map(function (item) {
    return hg.partial(Item.render, item);
  });

  return h('div', [
    h('button',
      {'ev-click': hg.event(state.handles.addItem)},
      'Add New Item'
    ),
    h('button',
      {'ev-click': hg.event(state.handles.addManyItems)},
      'Add Many Items'
    ),
    h('div', items)
  ]);
};

hg.app(document.body, App(), App.render);