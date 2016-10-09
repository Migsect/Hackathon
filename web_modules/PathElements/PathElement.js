"use strict";

/* global Crafty */

var PathElement = function(type, width, location)
{
  var self = this;
  Object.defineProperties(self,
  {
    type:
    {
      value: type,
      enumerable: true
    },
    location:
    {
      value: location,
      enumerable: true
    },
    width:
    {
      value: width,
      enumerable: true
    }
  });
};

Object.defineProperties(PathElement.prototype,
{
  render:
  {
    value: function(unit)
    {
      throw new Error("Not defined");
    },
    writable: true
  }
});

var StraightElement = function(location)
{
  var self = this;
  PathElement.call(self, "straight", 0.2, location);
};

StraightElement.prototype = Object.create(PathElement.prototype);
Object.defineProperties(StraightElement.prototype,
{
  constructor:
  {
    value: StraightElement
  },
  render:
  {
    value: function(unit)
    {
      Crafty.e("Top, 2D, Canvas, Color, Collision")
        .attr(
        {
          x: 0,
          y: 0,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Middle, 2D, Canvas, Color")
        .attr(
        {
          x: 0,
          y: unit * 0.2,
          w: unit * this.width,
          h: unit * 0.6
        });
      Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
        .attr(
        {
          x: 0,
          y: unit * 0.8,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
    }
  }
});

Object.defineProperties(module.exports,
{
  straight:
  {
    value: StraightElement
  }
});
