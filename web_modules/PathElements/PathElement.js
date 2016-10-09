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
  PathElement.call(self, "straight", 0.4, location);
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
          x: this.location,
          y: 0,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Middle, 2D, Canvas, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.2,
          w: unit * this.width,
          h: unit * 0.6
        });
      Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
        .attr(
        {
          x: this.location,
          y: unit * 0.8,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
    }
  }
});

var DropElement = function(location)
{
  var self = this;
  PathElement.call(self, "drops", 0.4, location);
};

DropElement.prototype = Object.create(PathElement.prototype);
Object.defineProperties(DropElement.prototype,
{
  constructor:
  {
    value: DropElement
  },
  render:
  {
    value: function(unit)
    {
      Crafty.e("Top, 2D, Canvas, Color, Collision")
        .attr(
        {
          x: this.location,
          y: 0,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Middle, 2D, Canvas, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.2,
          w: unit * this.width,
          h: unit * 0.6
        });
      Crafty.e("Floor, 2D, Canvas, Solid, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.8,
          w: (unit * this.width) / 2.5,
          h: unit * 0.2
        })
        .color("green");
    }
  }
});

var PitfallElement = function(location)
{
  var self = this;
  PathElement.call(self, "pitfall", 0.4, location);
};

PitfallElement.prototype = Object.create(PathElement.prototype);
Object.defineProperties(PitfallElement.prototype,
{
  constructor:
  {
    value: PitfallElement
  },
  render:
  {
    value: function(unit)
    {
      Crafty.e("Top, 2D, Canvas, Color, Collision")
        .attr(
        {
          x: this.location,
          y: 0,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Middle, 2D, Canvas, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.2,
          w: unit * this.width,
          h: unit * 0.6
        });
      Crafty.e("Floor, 2D, Canvas, Solid, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.8,
          w: (unit * this.width) / 3,
          h: unit * 0.2
        })
        .color("green");
    }
  }
});

var WallElement = function(location)
{
  var self = this;
  PathElement.call(self, "wall", 0.4, location);
};

WallElement.prototype = Object.create(PathElement.prototype);
Object.defineProperties(WallElement.prototype,
{
  constructor:
  {
    value: WallElement
  },
  render:
  {
    value: function(unit)
    {
      Crafty.e("Top, 2D, Canvas, Color, Collision")
        .attr(
        {
          x: this.location,
          y: 0,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Middle, 2D, Canvas, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.2,
          w: unit * this.width,
          h: unit * 0.6
        });
      Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
        .attr(
        {
          x: this.location,
          y: unit * 0.8,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Wall, 2D, Canvas, Solid, Color, Collision")
        .attr(
        {
          x: this.location,
          y: unit * 0.8 - ((unit * this.width) / 7),
          w: (unit * this.width) / 10,
          h: unit * 0.5,
          z: 0
        })
        .color("blue");
    }
  }
});

var BridgeHackElement = function(location)
{
  var self = this;
  PathElement.call(self, "bridgeHack", 0.4, location);
};

BridgeHackElement.prototype = Object.create(PathElement.prototype);
Object.defineProperties(BridgeHackElement.prototype,
{
  constructor:
  {
    value: BridgeHackElement
  },
  render:
  {
    value: function(unit)
    {
      Crafty.e("Top, 2D, Canvas, Color, Collision")
        .attr(
        {
          x: this.location,
          y: 0,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Middle, 2D, Canvas, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.2,
          w: unit * this.width,
          h: unit * 0.6
        });

      Crafty.e("Sign, 2D, Canvas, Solid, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.55,
          w: (unit * this.width) / 10,
          h: unit * 0.5
        })
        .color("yellow")
        .bind("KeyDown", function(e)
        {
          if (e.key == Crafty.keys.SPACE)
          {
            var answer = window.prompt("Default Question", "Answer");
            Crafty.pause();
            if (answer !== null)
            {
              document.getElementById("game").innerHTML = "yay4";
              Crafty.pause();

              Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
                .attr(
                {
                  x: this.location - 200,
                  y: unit * 0.8,
                  w: (unit * this.width),
                  h: unit * 0.2
                })
                .color("white");
            }
          }
        });
      //sign.On

    }
  }
});

var WallHackElement = function(location)
{
  var self = this;
  PathElement.call(self, "wallHack", 0.4, location);
};

WallHackElement.prototype = Object.create(PathElement.prototype);
Object.defineProperties(WallHackElement.prototype,
{
  constructor:
  {
    value: WallHackElement
  },
  render:
  {
    value: function(unit)
    {
      Crafty.e("Top, 2D, Canvas, Color, Collision")
        .attr(
        {
          x: this.location,
          y: 0,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Middle, 2D, Canvas, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.2,
          w: unit * this.width,
          h: unit * 0.6
        });
      Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
        .attr(
        {
          x: this.location,
          y: unit * 0.8,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Wall, 2D, Canvas, Solid, Color, Collision")
        .attr(
        {
          x: this.location,
          y: unit * 0.8 - ((unit * this.width)),
          w: (unit * this.width) / 10,
          h: unit * 0.5,
          z: 0
        })
        .color("blue");
      Crafty.e("Sign, 2D, Canvas, Solid, Color")
        .attr(
        {
          x: this.location,
          y: 500,
          w: (unit * this.width) / 10,
          h: 500
        })
        .color("yellow")
        .bind("KeyDown", function(e)
        {
          if (e.key == Crafty.keys.SPACE)
          {
            var answer = window.prompt("Default Question", "Answer");
            Crafty.pause();
            if (answer !== null)
            {
              document.getElementById("game").innerHTML = "yay3";
              Crafty.pause();

              Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
                .attr(
                {
                  x: this.location,
                  y: unit * 0.8,
                  w: (unit * this.width),
                  h: unit * 0.2
                })
                .color("green");
            }
          }
        });
    }
  }
});

var AttackElement = function(location)
{
  var self = this;
  PathElement.call(self, "attack", 0.4, location);
};

AttackElement.prototype = Object.create(PathElement.prototype);
Object.defineProperties(AttackElement.prototype,
{
  constructor:
  {
    value: AttackElement
  },
  render:
  {
    value: function(unit)
    {
      Crafty.e("Top, 2D, Canvas, Color, Collision")
        .attr(
        {
          x: this.location,
          y: 0,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Middle, 2D, Canvas, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.2,
          w: unit * this.width,
          h: unit * 0.6
        });
      Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
        .attr(
        {
          x: this.location,
          y: unit * 0.8,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Sign, 2D, Canvas, Solid, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.55,
          w: (unit * this.width) / 10,
          h: unit * 0.5
        })
        .color("yellow")
        .bind("KeyDown", function(e)
        {
          if (e.key == Crafty.keys.SPACE)
          {
            var answer = window.prompt("Default Question", "Answer");
            Crafty.pause();
            if (answer !== null)
            {
              document.getElementById("game").innerHTML = "yay2";
              Crafty.pause();

              Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
                .attr(
                {
                  x: this.location,
                  y: unit * 0.8,
                  w: (unit * this.width),
                  h: unit * 0.2
                })
                .color("green");
            }
          }
        });
    }
  }
});

var AssistElement = function(location)
{
  var self = this;
  PathElement.call(self, "assist", 0.4, location);
};

AssistElement.prototype = Object.create(PathElement.prototype);
Object.defineProperties(AssistElement.prototype,
{
  constructor:
  {
    value: AssistElement
  },
  render:
  {
    value: function(unit)
    {
      Crafty.e("Top, 2D, Canvas, Color, Collision")
        .attr(
        {
          x: this.location,
          y: 0,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Middle, 2D, Canvas, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.2,
          w: unit * this.width,
          h: unit * 0.6
        });
      Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
        .attr(
        {
          x: this.location,
          y: unit * 0.8,
          w: unit * this.width,
          h: unit * 0.2
        })
        .color("green");
      Crafty.e("Sign, 2D, Canvas, Solid, Color")
        .attr(
        {
          x: this.location,
          y: unit * 0.55,
          w: (unit * this.width) / 10,
          h: unit * 0.5
        })
        .color("yellow")
        .bind("KeyDown", function(e)
        {
          if (e.key == Crafty.keys.SPACE)
          {
            var answer = window.prompt("Default Question", "Answer");
            Crafty.pause();
            if (answer !== null)
            {
              document.getElementById("game").innerHTML = "yay";
              Crafty.pause();
              for (var i = 0; i < 8; i++) // maake next 8 straight 
              {
                Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
                  .attr(
                  {
                    x: this.location,
                    y: unit * 0.8,
                    w: (unit * this.width) * 8,
                    h: unit * 0.2
                  })
                  .color("green");
              }
            }
          }
        });
    }
  }
});

Object.defineProperties(module.exports,
{
  straight:
  {
    value: StraightElement
  },
  drops:
  {
    value: DropElement
  },
  pitfall:
  {
    value: PitfallElement
  },
  wall:
  {
    value: WallElement
  },
  bridgeHack:
  {
    value: BridgeHackElement
  },
  wallHack:
  {
    value: WallHackElement
  },
  attack:
  {
    value: AttackElement
  },
  assist:
  {
    value: AssistElement
  }
});
