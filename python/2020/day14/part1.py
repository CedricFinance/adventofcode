

class SetMask:

  def __init__(self, str):
    self.str = str
    self.clearMask = 0
    self.setMask = 0

    for i, c in enumerate(str):
      if c == "1":
        self.setMask |= 1 << 35 - i

      if c == "0":
        self.clearMask |= 1 << 35 - i


  def apply(self, state):
    state["mask"] = self

  def mask(self, value):
    value |= self.setMask
    value &= ~ self.clearMask
    return value

  def __str__(self):
    return "mask = { clear: %s, set: %s }" % (self.clearMask, self.setMask)


class WriteMem:

  def __init__(self, addr, value):
    self.addr = addr
    self.value = value

  def apply(self, state):
    state["mem"][self.addr] = state["mask"].mask(self.value)

  def __str__(self):
    return "mem[%d] = %d" % (self.addr, self.value)


def parseInstructions(str):
  left, right = str.split(" = ")

  if left == "mask":
      return SetMask(right)

  addrStr = left.split("[")[1]
  addrStr = addrStr[:-1]

  return WriteMem(int(addrStr, 10), int(right, 10))

lines = open("input.txt").read().splitlines()

instructions = list(map(parseInstructions, lines))

for inst in instructions:
  print(inst)

state = {
  'mask': None,
  'mem': {}
}

for inst in instructions:
  inst.apply(state)

print("Result: ", sum(state["mem"].values()))