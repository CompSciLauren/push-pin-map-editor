import React from "react";
import { Stage, Layer, Star, Image, Rect, Text } from "react-konva";
import useImage from "use-image";
import "./App.css";

const MapOfOverlandPark = () => {
  const [image] = useImage("/large-detailed-map-of-overland-park.jpg");
  return <Image image={image} />;
};

function logIssue() {
  window.open(
    "https://github.com/CompSciLauren/push-pin-map-editor/issues/new?assignees=&labels=bug&template=bug_report.md&title="
  );
}

function requestFeature() {
  window.open(
    "https://github.com/CompSciLauren/push-pin-map-editor/issues/new?assignees=&labels=enhancement&template=feature_request.md&title="
  );
}

function generateShapes() {
  return [...Array(5)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

function App() {
  const [stars, setStars] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  const addStar = () => {
    const updatedState = [
      ...stars,
      {
        id: stars.length.toString(),
        x: Math.random() * 200,
        y: Math.random() * 200,
        rotation: Math.random() * 180,
        isDragging: false,
      },
    ];

    setStars(updatedState);
    console.log(updatedState);
  };

  return (
    <Stage width={3409} height={4699}>
      <Layer>
        <MapOfOverlandPark />
        {stars.map((star) => (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            scaleX={star.isDragging ? 1.2 : 1}
            scaleY={star.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
      <Layer draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Rect
          x={0}
          y={200}
          width={180}
          height={400}
          fill="gray"
          opacity={0.7}
          shadowBlur={10}
        ></Rect>
        <Text
          text="Add star"
          x={12}
          y={220}
          fontSize={16}
          fill="white"
          onclick={addStar}
        />
        <Text
          text="Log an issue"
          x={12}
          y={260}
          fontSize={16}
          fill="white"
          onclick={() => logIssue()}
        />
        <Text
          text="Request a feature"
          x={12}
          y={300}
          fontSize={16}
          fill="white"
          onclick={() => requestFeature()}
        />
      </Layer>
    </Stage>
  );
}

export default App;
