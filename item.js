var hg = require('mercury');
var h = hg.h;

var id = 1;

module.exports = Item;

function Item() {
  var state = hg.struct({
    id: ++id,
    color: hg.value(randomColor()),
    width: hg.value(Math.floor(Math.random() * 800 + 200)),
    handles: hg.value(null)
  });

  state.handles.set(hg.handles({
    changeWidth: function changeWidth(state, data) {
      state.width.set(data.slider);
    }
  }, state));

  return state;
}

Item.render = function render(state) {
  return h('div.item', {
    'style': {
      'background': 'none repeat scroll 0% 0% ' + state.color,
      'width': state.width + 'px',
    }}, [
      h('div', [
        h('input', {
          type: 'range', min:'200', max:'1000', value: state.width,
          name: 'slider',
          'ev-event': hg.changeEvent(state.handles.changeWidth)
        })
      ]),
      h('div', String(state.width))
    ]
  );
};

function randomColor() {
  var hex = Math.floor(Math.random() * 16777215).toString(16);
  while (hex.length < 6) {
    hex = "0" + hex;
  }
  return "#" + hex;
}