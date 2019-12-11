package day11

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
)

type Color int8

type Rotation int8

const (
	Black Color = iota
	White
)

const (
	TurnLeft Rotation = iota
	TurnRight
)

type Heading interface {
	Move(p lib.Point) lib.Point
	Rotate(rotation Rotation) Heading
}

type UpHeading struct{}
type DownHeading struct{}
type LeftHeading struct{}
type RightHeading struct{}

func (h UpHeading) Move(p lib.Point) lib.Point {
	return lib.Point{
		X: p.X,
		Y: p.Y - 1,
	}
}

func (h UpHeading) Rotate(rotation Rotation) Heading {
	if rotation == TurnLeft {
		return LeftHeading{}
	}
	return RightHeading{}
}

func (h DownHeading) Move(p lib.Point) lib.Point {
	return lib.Point{
		X: p.X,
		Y: p.Y + 1,
	}
}

func (h DownHeading) Rotate(rotation Rotation) Heading {
	if rotation == TurnLeft {
		return RightHeading{}
	}
	return LeftHeading{}
}

func (h LeftHeading) Move(p lib.Point) lib.Point {
	return lib.Point{
		X: p.X - 1,
		Y: p.Y,
	}
}

func (h LeftHeading) Rotate(rotation Rotation) Heading {
	if rotation == TurnLeft {
		return DownHeading{}
	}
	return UpHeading{}
}

func (h RightHeading) Move(p lib.Point) lib.Point {
	return lib.Point{
		X: p.X + 1,
		Y: p.Y,
	}
}

func (h RightHeading) Rotate(rotation Rotation) Heading {
	if rotation == TurnLeft {
		return UpHeading{}
	}
	return DownHeading{}
}
