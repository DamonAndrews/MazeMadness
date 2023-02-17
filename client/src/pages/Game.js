import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Cell, Maze } from '../utils/maze/maze'

import Auth from '../utils/auth';
import { Navigate, useNavigate } from 'react-router-dom';

import Timer from '../components/Timer/index'

class Boundary {

  static width = 40
  static height = 40
  constructor({ position }, c) {
    this.c = c
    this.position = position
    this.width = 40
    this.height = 40
  }

  draw() {
    this.c.fillStyle = 'white'
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Player {
  constructor({ position, velocity }, c) {
    this.c = c
    this.position = position
    this.velocity = velocity
    this.radius = 8
  }

  draw({ x, y }) {
    new Promise(res => {
      this.c.beginPath();
      this.c.clearRect(
        x - this.radius - 3,
        y - this.radius - 3,
        this.radius * 2 + 6,
        this.radius * 2 + 6
      );
      this.c.closePath();

      res("Erased")
    }).then(() => {
      this.c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
      this.c.fillStyle = 'yellow'
      this.c.fill()
      this.c.closePath()
    })
  }

  update(prevPos) {
    this.draw({ x: this.position.x, y: this.position.y })
    this.position.x = prevPos.x + this.velocity.x
    this.position.y = prevPos.y + this.velocity.y

    console.log(prevPos, this.position)
  }
}


 let map = [
   ['-', '-', '-', '-', '-', '-', '-'],
   ['-', ' ', ' ', ' ', ' ', ' ', '-'],
   ['-', ' ', '-', ' ', '-', ' ', '-'],
   ['-', ' ', ' ', ' ', ' ', ' ', '-'],
   ['-', ' ', '-', ' ', '-', ' ', '-'],
   ['-', ' ', ' ', ' ', ' ', ' ', '-'],
   ['-', '-', '-', '-', '-', '-', '-']
 ]

export default function Game({ parentRef, ...props }) {
  
  const navigate = useNavigate()
  const [c, setC] = useState({
    value: null
  });
  const [timer, setTimer] = useState(30)
  const [player, setPlayer] = useState(null);
  const [boundaries, setBoundaries] = useState([]);
  const [prevPos, setPrevPos] = useState({
    x: 25 + 25 / 2,
    y: 25 + 25 / 2
  })
  const [keys, setKeys] = useState({
    w: {
      pressed: false
    },
    s: {
      pressed: false
    },
    a: {
      pressed: false
    },
    d: {
      pressed: false
    }
  });
  const [lastKey, setLastKey] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    determineBoundaries()

    setC({ value: context });

    

    function determineBoundaries() {

    const NewMaze = new Maze (500, 20, 20, context, canvas);
    map = NewMaze.setup(context,canvas);
    NewMaze.draw(canvas, context);
    
    const newCell = new Cell()


      const boundariesTemp = [];
      boundariesTemp.forEach((row, i) => {
         row.forEach((symbol, j) => {
         switch (symbol) {
            case "":
              const boundary = new Boundary({
                position: {
               x: 25 * j,
                  y: 25 * i
                }
           }, context)
              boundariesTemp.push(
             boundary
              )
            boundary.draw()
              break
            default: break;
       }
        })
      })
      setBoundaries(map.grid)
    }
    const playerInit = new Player({
      position: {
        x: 25 + 25 / 2,
        y: 25 + 25 / 2
      },
      velocity: {
        x: 0,
        y: 0
      }
    }, context)
    setPlayer(playerInit)
    playerInit.draw({
      x: 25 + 25 / 2,
      y: 25 + 25 / 2
    })

    document.addEventListener("keyup", () => {
      setLastKey(null)
      setKeys({
        w: {
          pressed: false
        },
        s: {
          pressed: false
        },
        a: {
          pressed: false
        },
        d: {
          pressed: false
        }
      })
    });

    document.addEventListener("keydown", handleKeyPressOrRelease);
  }, [])

  function circleCollidesWithRectangle({ circle, rectangle }) {
    return (
      circle.position.y - circle.radius + circle.velocity.y <= rectangle.rowNum + 25 && circle.position.x + circle.radius + circle.velocity.x >= rectangle.colNum && circle.position.y + circle.radius + circle.velocity.y >= rectangle.rowNum && circle.position.x - circle.radius + circle.velocity.x <= rectangle.colNum + 25
    )
  }

  function goX(x, key) {
    setPrevPos({
      ...prevPos,
      x: player.position.x
    })

    if (keys[key]?.pressed && lastKey === key) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (circleCollidesWithRectangle({
          circle: {
            ...player, velocity: {
              x,
              y: 0
            }
          }, rectangle: boundary
        })) {
          setPlayer(
            new Player({
              ...player,
              velocity: {
                ...player.velocity,
                x: 0
              }
            }, c?.value))
          break
        } else {
          setPlayer(
            new Player({
              ...player,
              velocity: {
                ...player.velocity,
                x,
                y: 0
              }
            }, c?.value))
        }
      }
    }

  }

  function goY(y, key) {
    setPrevPos({
      ...prevPos,
      y: player.position.y
    })

    if (keys[key]?.pressed && lastKey === key) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (circleCollidesWithRectangle({
          circle: {
            ...player, velocity: {
              x: 0,
              y
            }
          }, rectangle: boundary
        })) {
          setPlayer(
            new Player({
              ...player,
              velocity: {
                ...player.velocity,
                y: 0
              }
            }, c?.value))
          break
        } else {
          setPlayer(
            new Player({
              ...player,
              velocity: {
                ...player.velocity,
                x: 0,
                y
              }
            }, c?.value))
        }
      }
    }
  }

  useEffect(() => {
   
  }, [player?.velocity.x, player?.velocity.y])

  const handleKeyPressOrRelease = ({ key }) => {
    setKeys({
      ...keys,
      [key]: {
        pressed: ![key].pressed
      }
    })
    setLastKey(key)
  }

  useEffect(() => {
    if (!lastKey) {
      return
    }

    if (lastKey === "w") {
      // goY(-5, "w")
      requestAnimationFrame(() => goY(-5, "w"));
    } else if (lastKey === "s") {
      // goY(5, "s");
      requestAnimationFrame(() => goY(5, "s"));
    } else if (lastKey === "a") {
      // goX(5, "a")
      requestAnimationFrame(() => goX(-5, "a"));
    } else if (lastKey === "d") {
      // goX(-5, "d")
      requestAnimationFrame(() => goX(5, "d"));
    }

    boundaries.forEach((boundary) => {
    boundary.draw()
    })
    player?.update(prevPos)
  }, [
    lastKey, 
    goX,
    goY,
    player?.position.x, 
    player?.position.y, 
    player?.velocity.x, 
    player?.velocity.y
  ])

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }
 
  const respondToTimeout = () => {
    console.log("redirect to new page")
    navigate("/gameover")
  }
  return (
  <div>
    <div id="flexBox">
    <div>
      <div id='timer'>Time Remaining:</div>
      <Timer timer={timer} setTimer={setTimer} respondToTimeout={respondToTimeout} />
      <canvas style={{background:'black'}}height={500} width={500} ref={canvasRef} {...props} 
      />
    </div >
    </div>
    </div>
  )
};


