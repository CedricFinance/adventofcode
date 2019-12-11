package day11

import "github.com/CedricFinance/adventofcode/2019/lib"

func PaintPanels(program *lib.Program) map[lib.Point]Color {
	go program.Run()

	panels := make(map[lib.Point]Color)
	currentPoint := lib.Point{0, 0}
	currentHeading := Heading(UpHeading{})

	running := true
	for running {
		select {
		case program.Input <- int64(panels[currentPoint]):
			value := <-program.Output

			panels[currentPoint] = Color(value)

			value = <-program.Output

			currentHeading = currentHeading.Rotate(Rotation(value))
			currentPoint = currentHeading.Move(currentPoint)
		case <-program.Exited:
			running = false
			break
		}

	}

	return panels
}
