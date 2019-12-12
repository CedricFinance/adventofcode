package day12

type Vector struct {
	X, Y, Z int
}

type Moon struct {
	Position Vector
	Velocity Vector
}

func (m *Moon) UpdatePosition() {
	m.Position.X += m.Velocity.X
	m.Position.Y += m.Velocity.Y
	m.Position.Z += m.Velocity.Z
}

func (m *Moon) PotentialEnergy() int {
	return Abs(m.Position.X) + Abs(m.Position.Y) + Abs(m.Position.Z)
}

func (m *Moon) KineticEnergy() int {
	return Abs(m.Velocity.X) + Abs(m.Velocity.Y) + Abs(m.Velocity.Z)
}

func Abs(i int) int {
	if i > 0 {
		return i
	}
	return -i
}

type Moons [4]*Moon

func (m Moons) Simulate() {
	m.updateVelocity()
	m.updatePosition()
}

func (m Moons) SimulateN(count int) {
	for i := 0; i < count; i++ {
		m.Simulate()
	}
}

func (m Moons) TotalEnergy() int {
	totalEnergy := 0
	for _, moon := range m {
		totalEnergy += moon.PotentialEnergy() * moon.KineticEnergy()
	}
	return totalEnergy
}

func (m Moons) updateVelocity() {
	for i := 0; i < len(m)-1; i++ {
		firstMoon := m[i]
		for j := i + 1; j < len(m); j++ {
			secondMoon := m[j]

			stepX := velocityStep(secondMoon.Position.X - firstMoon.Position.X)
			secondMoon.Velocity.X -= stepX
			firstMoon.Velocity.X += stepX
			stepY := velocityStep(secondMoon.Position.Y - firstMoon.Position.Y)
			secondMoon.Velocity.Y -= stepY
			firstMoon.Velocity.Y += stepY
			stepZ := velocityStep(secondMoon.Position.Z - firstMoon.Position.Z)
			secondMoon.Velocity.Z -= stepZ
			firstMoon.Velocity.Z += stepZ
		}
	}
}

func (m Moons) updatePosition() {
	for _, moon := range m {
		moon.UpdatePosition()
	}
}

func velocityStep(diff int) int {
	if diff == 0 {
		return 0
	}
	if diff > 0 {
		return 1
	}
	return -1
}
