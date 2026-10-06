export type Barber = {
  id: string
  name: string
  isOwner?: boolean
}

export const barbers: Barber[] = [
  {
    id: "barbeiro-1",
    name: "Barbeiro 1",
  },
  {
    id: "barbeiro-2",
    name: "Barbeiro 2",
  },
  {
    id: "barbeiro-3",
    name: "Barbeiro 3",
  },
  {
    id: "dono",
    name: "Dono",
    isOwner: true,
  },
]