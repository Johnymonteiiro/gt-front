export type Person = {
  id: number
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Array<Person>
}

const FIRST_NAMES: Array<string> = [
  'Alice',
  'Bob',
  'Carol',
  'David',
  'Eva',
  'Frank',
]
const LAST_NAMES: Array<string> = [
  'Silva',
  'Souza',
  'Oliveira',
  'Pereira',
  'Costa',
  'Almeida',
]
const STATUSES: Array<Person['status']> = [
  'relationship',
  'complicated',
  'single',
]

const randomInt = (max: number): number => Math.floor(Math.random() * (max + 1))

const range = (len: number): Array<number> =>
  Array.from({ length: len }, (_, i) => i)

const newPerson = (id: number): Person => ({
  id,
  firstName: FIRST_NAMES[id % FIRST_NAMES.length],
  lastName: LAST_NAMES[id % LAST_NAMES.length],
  age: 18 + randomInt(42), // idades entre 18 e 60
  visits: randomInt(1000), // até 1000 visitas
  progress: randomInt(100), // progresso de 0 a 100%
  status: STATUSES[randomInt(STATUSES.length - 1)],
})

export function makeData(...lens: Array<number>): Array<Person> {
  const makeLevel = (depth = 0): Array<Person> => {
    const len = lens[depth] ?? 0
    return range(len).map((idx) => ({
      ...newPerson(idx),
      subRows: lens[depth + 1] ? makeLevel(depth + 1) : undefined,
    }))
  }

  return makeLevel()
}
