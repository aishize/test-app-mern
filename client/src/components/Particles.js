import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Circle, Star, Text } from 'react-konva';

export const Particles = () => {
       const handleDragStart = e => {
          e.target.setAttrs({
            shadowOffset: {
              x: 15,
              y: 15
            },
            scaleX: 1.4,
            scaleY: 1.4
          })
        };
       const handleDragEnd = e => {
          e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffsetX: 5,
            shadowOffsetY: 5
          })
        }
          return (
            <Stage width={1280} height={728} >
              <Layer>
              <Text text="Try to drag circles and stars" />
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    x={Math.random() * 1000}
                    y={Math.random() * 700}
                    numPoints={5}
                    innerRadius={20}
                    outerRadius={40}
                    fill="#89b717"
                    opacity={0.8}
                    draggable
                    rotation={Math.random() * 180}
                    shadowColor="black"
                    shadowBlur={10}
                    shadowOpacity={0.6}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
                  {[...Array(5)].map((_,i)=> (
                      <Circle
                        key = {i}
                        x={(Math.random() * 1000)}
                        y={(Math.random() * 700)}
                        radius={20}
                        fill="#89b717"
                        opacity={0.8}
                        draggable
                        shadowColor="black"
                        shadowBlur={10}
                        shadowOpacity={0.6}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                  ))}
              </Layer>
            </Stage>
          )
      }
      

  