(function() {
  var event, mouseEvent, objectCenterCoordinates;

  event = function(type, properties) {
    if (properties == null) {
      properties = {};
    }
    return new Event(type, properties);
  };

  mouseEvent = function(type, properties) {
    var defaults, k, v;
    defaults = {
      bubbles: true,
      cancelable: type !== "mousemove",
      view: window,
      detail: 0,
      pageX: 0,
      pageY: 0,
      clientX: 0,
      clientY: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: void 0
    };
    for (k in defaults) {
      v = defaults[k];
      if (properties[k] == null) {
        properties[k] = v;
      }
    }
    return new MouseEvent(type, properties);
  };

  objectCenterCoordinates = function(target) {
    var height, left, ref, top, width;
    ref = target.getBoundingClientRect(), top = ref.top, left = ref.left, width = ref.width, height = ref.height;
    return {
      x: left + width / 2,
      y: top + height / 2
    };
  };

  module.exports = {
    objectCenterCoordinates: objectCenterCoordinates,
    mouseEvent: mouseEvent,
    event: event
  };

  ['mousedown', 'mousemove', 'mouseup', 'click'].forEach(function(key) {
    return module.exports[key] = function(target, x, y, cx, cy, btn) {
      var ref;
      if (!((x != null) && (y != null))) {
        ref = objectCenterCoordinates(target), x = ref.x, y = ref.y;
      }
      if (!((cx != null) && (cy != null))) {
        cx = x;
        cy = y;
      }
      return target.dispatchEvent(mouseEvent(key, {
        target: target,
        pageX: x,
        pageY: y,
        clientX: cx,
        clientY: cy,
        button: btn
      }));
    };
  });

  module.exports.mousewheel = function(target, deltaX, deltaY) {
    if (deltaX == null) {
      deltaX = 0;
    }
    if (deltaY == null) {
      deltaY = 0;
    }
    return target.dispatchEvent(mouseEvent('mousewheel', {
      target: target,
      deltaX: deltaX,
      deltaY: deltaY
    }));
  };

  module.exports.change = function(target) {
    return target.dispatchEvent(event('change', {
      target: target
    }));
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9waWdtZW50cy9zcGVjL2hlbHBlcnMvZXZlbnRzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsS0FBQSxHQUFRLFNBQUMsSUFBRCxFQUFPLFVBQVA7O01BQU8sYUFBVzs7V0FBTyxJQUFJLEtBQUosQ0FBVSxJQUFWLEVBQWdCLFVBQWhCO0VBQXpCOztFQUVSLFVBQUEsR0FBYSxTQUFDLElBQUQsRUFBTyxVQUFQO0FBQ1gsUUFBQTtJQUFBLFFBQUEsR0FBVztNQUNULE9BQUEsRUFBUyxJQURBO01BRVQsVUFBQSxFQUFhLElBQUEsS0FBVSxXQUZkO01BR1QsSUFBQSxFQUFNLE1BSEc7TUFJVCxNQUFBLEVBQVEsQ0FKQztNQUtULEtBQUEsRUFBTyxDQUxFO01BTVQsS0FBQSxFQUFPLENBTkU7TUFPVCxPQUFBLEVBQVMsQ0FQQTtNQVFULE9BQUEsRUFBUyxDQVJBO01BU1QsT0FBQSxFQUFTLEtBVEE7TUFVVCxNQUFBLEVBQVEsS0FWQztNQVdULFFBQUEsRUFBVSxLQVhEO01BWVQsT0FBQSxFQUFTLEtBWkE7TUFhVCxNQUFBLEVBQVEsQ0FiQztNQWNULGFBQUEsRUFBZSxNQWROOztBQWlCWCxTQUFBLGFBQUE7O1VBQStDO1FBQS9DLFVBQVcsQ0FBQSxDQUFBLENBQVgsR0FBZ0I7O0FBQWhCO1dBRUEsSUFBSSxVQUFKLENBQWUsSUFBZixFQUFxQixVQUFyQjtFQXBCVzs7RUFzQmIsdUJBQUEsR0FBMEIsU0FBQyxNQUFEO0FBQ3hCLFFBQUE7SUFBQSxNQUE2QixNQUFNLENBQUMscUJBQVAsQ0FBQSxDQUE3QixFQUFDLGFBQUQsRUFBTSxlQUFOLEVBQVksaUJBQVosRUFBbUI7V0FDbkI7TUFBQyxDQUFBLEVBQUcsSUFBQSxHQUFPLEtBQUEsR0FBUSxDQUFuQjtNQUFzQixDQUFBLEVBQUcsR0FBQSxHQUFNLE1BQUEsR0FBUyxDQUF4Qzs7RUFGd0I7O0VBSTFCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0lBQUMseUJBQUEsdUJBQUQ7SUFBMEIsWUFBQSxVQUExQjtJQUFzQyxPQUFBLEtBQXRDOzs7RUFFakIsQ0FBQyxXQUFELEVBQWMsV0FBZCxFQUEyQixTQUEzQixFQUFzQyxPQUF0QyxDQUE4QyxDQUFDLE9BQS9DLENBQXVELFNBQUMsR0FBRDtXQUNyRCxNQUFNLENBQUMsT0FBUSxDQUFBLEdBQUEsQ0FBZixHQUFzQixTQUFDLE1BQUQsRUFBUyxDQUFULEVBQVksQ0FBWixFQUFlLEVBQWYsRUFBbUIsRUFBbkIsRUFBdUIsR0FBdkI7QUFDcEIsVUFBQTtNQUFBLElBQUEsQ0FBQSxDQUErQyxXQUFBLElBQU8sV0FBdEQsQ0FBQTtRQUFBLE1BQVEsdUJBQUEsQ0FBd0IsTUFBeEIsQ0FBUixFQUFDLFNBQUQsRUFBRyxVQUFIOztNQUVBLElBQUEsQ0FBQSxDQUFPLFlBQUEsSUFBUSxZQUFmLENBQUE7UUFDRSxFQUFBLEdBQUs7UUFDTCxFQUFBLEdBQUssRUFGUDs7YUFJQSxNQUFNLENBQUMsYUFBUCxDQUFxQixVQUFBLENBQVcsR0FBWCxFQUFnQjtRQUFDLFFBQUEsTUFBRDtRQUFTLEtBQUEsRUFBTyxDQUFoQjtRQUFtQixLQUFBLEVBQU8sQ0FBMUI7UUFBNkIsT0FBQSxFQUFTLEVBQXRDO1FBQTBDLE9BQUEsRUFBUyxFQUFuRDtRQUF1RCxNQUFBLEVBQVEsR0FBL0Q7T0FBaEIsQ0FBckI7SUFQb0I7RUFEK0IsQ0FBdkQ7O0VBVUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFmLEdBQTRCLFNBQUMsTUFBRCxFQUFTLE1BQVQsRUFBbUIsTUFBbkI7O01BQVMsU0FBTzs7O01BQUcsU0FBTzs7V0FDcEQsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsVUFBQSxDQUFXLFlBQVgsRUFBeUI7TUFBQyxRQUFBLE1BQUQ7TUFBUyxRQUFBLE1BQVQ7TUFBaUIsUUFBQSxNQUFqQjtLQUF6QixDQUFyQjtFQUQwQjs7RUFHNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFmLEdBQXdCLFNBQUMsTUFBRDtXQUN0QixNQUFNLENBQUMsYUFBUCxDQUFxQixLQUFBLENBQU0sUUFBTixFQUFnQjtNQUFDLFFBQUEsTUFBRDtLQUFoQixDQUFyQjtFQURzQjtBQTNDeEIiLCJzb3VyY2VzQ29udGVudCI6WyJldmVudCA9ICh0eXBlLCBwcm9wZXJ0aWVzPXt9KSAtPiBuZXcgRXZlbnQgdHlwZSwgcHJvcGVydGllc1xuXG5tb3VzZUV2ZW50ID0gKHR5cGUsIHByb3BlcnRpZXMpIC0+XG4gIGRlZmF1bHRzID0ge1xuICAgIGJ1YmJsZXM6IHRydWVcbiAgICBjYW5jZWxhYmxlOiAodHlwZSBpc250IFwibW91c2Vtb3ZlXCIpXG4gICAgdmlldzogd2luZG93XG4gICAgZGV0YWlsOiAwXG4gICAgcGFnZVg6IDBcbiAgICBwYWdlWTogMFxuICAgIGNsaWVudFg6IDBcbiAgICBjbGllbnRZOiAwXG4gICAgY3RybEtleTogZmFsc2VcbiAgICBhbHRLZXk6IGZhbHNlXG4gICAgc2hpZnRLZXk6IGZhbHNlXG4gICAgbWV0YUtleTogZmFsc2VcbiAgICBidXR0b246IDBcbiAgICByZWxhdGVkVGFyZ2V0OiB1bmRlZmluZWRcbiAgfVxuXG4gIHByb3BlcnRpZXNba10gPSB2IGZvciBrLHYgb2YgZGVmYXVsdHMgd2hlbiBub3QgcHJvcGVydGllc1trXT9cblxuICBuZXcgTW91c2VFdmVudCB0eXBlLCBwcm9wZXJ0aWVzXG5cbm9iamVjdENlbnRlckNvb3JkaW5hdGVzID0gKHRhcmdldCkgLT5cbiAge3RvcCwgbGVmdCwgd2lkdGgsIGhlaWdodH0gPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAge3g6IGxlZnQgKyB3aWR0aCAvIDIsIHk6IHRvcCArIGhlaWdodCAvIDJ9XG5cbm1vZHVsZS5leHBvcnRzID0ge29iamVjdENlbnRlckNvb3JkaW5hdGVzLCBtb3VzZUV2ZW50LCBldmVudH1cblxuWydtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnLCAnY2xpY2snXS5mb3JFYWNoIChrZXkpIC0+XG4gIG1vZHVsZS5leHBvcnRzW2tleV0gPSAodGFyZ2V0LCB4LCB5LCBjeCwgY3ksIGJ0bikgLT5cbiAgICB7eCx5fSA9IG9iamVjdENlbnRlckNvb3JkaW5hdGVzKHRhcmdldCkgdW5sZXNzIHg/IGFuZCB5P1xuXG4gICAgdW5sZXNzIGN4PyBhbmQgY3k/XG4gICAgICBjeCA9IHhcbiAgICAgIGN5ID0geVxuXG4gICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCBrZXksIHt0YXJnZXQsIHBhZ2VYOiB4LCBwYWdlWTogeSwgY2xpZW50WDogY3gsIGNsaWVudFk6IGN5LCBidXR0b246IGJ0bn0pXG5cbm1vZHVsZS5leHBvcnRzLm1vdXNld2hlZWwgPSAodGFyZ2V0LCBkZWx0YVg9MCwgZGVsdGFZPTApIC0+XG4gIHRhcmdldC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQgJ21vdXNld2hlZWwnLCB7dGFyZ2V0LCBkZWx0YVgsIGRlbHRhWX0pXG5cbm1vZHVsZS5leHBvcnRzLmNoYW5nZSA9ICh0YXJnZXQpIC0+XG4gIHRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50ICdjaGFuZ2UnLCB7dGFyZ2V0fSlcbiJdfQ==
