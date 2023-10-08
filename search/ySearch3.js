class Node {
  constructor(word) {
    this.word = word
    this.children = {}
  }
}

class BKTree {
  constructor() {
    this.root = null
  }

  add(word) {
    if (!this.root) {
      this.root = new Node(word)
      return
    }
    this._add(this.root, word)
  }

  _add(node, word) {
    const inp = word.toLowerCase().split(' ')
    if (!node.children[inp.length]) {
      node.children[inp.length] = {}
    }
    node.children[inp.length][inp.join(' ')] = new Node(word)
  }

  search(query, tolerance) {
    const res = []
    if (!this.root) return res

    const queryinp = query.toLowerCase().split(' ')
    const lQueryinp = queryinp[queryinp.length - 1]

    this._search(this.root, lQueryinp, tolerance, res)
    return res
  }

  _dis(a, b) {
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i])
    for (let j = 1; j <= b.length; j++) {
      dp[0][j] = j
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        )
      }
    }

    return dp[a.length][b.length]
  }

  _totdis(queryinp, nodeinp) {
    let minDistance = Infinity

    for (let i = 0; i < nodeinp.length; i++) {
      const distance = this._dis(queryinp, nodeinp[i])
      minDistance = Math.min(minDistance, distance)
    }

    return minDistance
  }

  _search(node, queryinp, tolerance, res) {
    const nodeinp = node.word.toLowerCase().split(' ')
    const distance = this._totdis(queryinp, nodeinp)

    if (distance <= tolerance) {
      res.push(node.word)
    }

    for (
      let i = Math.max(1, nodeinp.length - tolerance);
      i <= nodeinp.length + tolerance;
      i++
    ) {
      if (node.children[i]) {
        for (const key in node.children[i]) {
          this._search(node.children[i][key], queryinp, tolerance, res)
        }
      }
    }
  }
}

const bktree = new BKTree()
const data = [
  ...new Set([
    'Chinua Achebe',
    'Hans Christian Andersen',
    'Dante Alighieri',
    'Unknown',
    'Unknown',
    'Unknown',
    'Unknown',
    'Jane Austen',
    'Honoré de Balzac',
    'Samuel Beckett',
    'Giovanni Boccaccio',
    'Jorge Luis Borges',
    'Emily Brontë',
    'Albert Camus',
    'Paul Celan',
    'Louis-Ferdinand Céline',
    'Miguel de Cervantes',
    'Geoffrey Chaucer',
    'Anton Chekhov',
    'Joseph Conrad',
    'Charles Dickens',
    'Denis Diderot',
    'Alfred Döblin',
    'Fyodor Dostoevsky',
    'Fyodor Dostoevsky',
    'Fyodor Dostoevsky',
    'Fyodor Dostoevsky',
    'George Eliot',
    'Ralph Ellison',
    'Euripides',
    'William Faulkner',
    'William Faulkner',
    'Gustave Flaubert',
    'Gustave Flaubert',
    'Federico García Lorca',
    'Gabriel García Márquez',
    'Gabriel García Márquez',
    'Johann Wolfgang von Goethe',
    'Nikolai Gogol',
    'Günter Grass',
    'João Guimarães Rosa',
    'Knut Hamsun',
    'Ernest Hemingway',
    'Homer',
    'Homer',
    'Henrik Ibsen',
    'James Joyce',
    'Franz Kafka',
    'Franz Kafka',
    'Franz Kafka',
    'Kālidāsa',
    'Yasunari Kawabata',
    'Nikos Kazantzakis',
    'D. H. Lawrence',
    'Halldór Laxness',
    'Giacomo Leopardi',
    'Doris Lessing',
    'Astrid Lindgren',
    'Lu Xun',
    'Naguib Mahfouz',
    'Thomas Mann',
    'Thomas Mann',
    'Herman Melville',
    'Michel de Montaigne',
    'Elsa Morante',
    'Toni Morrison',
    'Murasaki Shikibu',
    'Robert Musil',
    'Vladimir Nabokov',
    'George Orwell',
    'Ovid',
    'Fernando Pessoa',
    'Edgar Allan Poe',
    'Marcel Proust',
    'François Rabelais',
    'Juan Rulfo',
    'Rumi',
    'Salman Rushdie',
    'Saadi',
    'Tayeb Salih',
    'José Saramago',
    'William Shakespeare',
    'William Shakespeare',
    'William Shakespeare',
    'Sophocles',
    'Stendhal',
    'Laurence Sterne',
    'Italo Svevo',
    'Jonathan Swift',
    'Leo Tolstoy',
    'Leo Tolstoy',
    'Leo Tolstoy',
    'Mark Twain',
    'Valmiki',
    'Virgil',
    'Vyasa',
    'Walt Whitman',
    'Virginia Woolf',
    'Virginia Woolf',
    'Marguerite Yourcenar',
    'Things Fall Apart',
    'Fairy tales',
    'The Divine Comedy',
    'The Epic Of Gilgamesh',
    'The Book Of Job',
    'One Thousand and One Nights',
    "Njál's Saga",
    'Pride and Prejudice',
    'Le Père Goriot',
    'Molloy, Malone Dies, The Unnamable, the trilogy',
    'The Decameron',
    'Ficciones',
    'Wuthering Heights',
    'The Stranger',
    'Poems',
    'Journey to the End of the Night',
    'Don Quijote De La Mancha',
    'The Canterbury Tales',
    'Stories',
    'Nostromo',
    'Great Expectations',
    'Jacques the Fatalist',
    'Berlin Alexanderplatz',
    'Crime and Punishment',
    'The Idiot',
    'The Possessed',
    'The Brothers Karamazov',
    'Middlemarch',
    'Invisible Man',
    'Medea',
    'Absalom, Absalom!',
    'The Sound and the Fury',
    'Madame Bovary',
    'Sentimental Education',
    'Gypsy Ballads',
    'One Hundred Years of Solitude',
    'Love in the Time of Cholera',
    'Faust',
    'Dead Souls',
    'The Tin Drum',
    'The Devil to Pay in the Backlands',
    'Hunger',
    'The Old Man and the Sea',
    'Iliad',
    'Odyssey',
    "A Doll's House",
    'Ulysses',
    'Stories',
    'The Trial',
    'The Castle',
    'The recognition of Shakuntala',
    'The Sound of the Mountain',
    'Zorba the Greek',
    'Sons and Lovers',
    'Independent People',
    'Poems',
    'The Golden Notebook',
    'Pippi Longstocking',
    'Diary of a Madman',
    'Children of Gebelawi',
    'Buddenbrooks',
    'The Magic Mountain',
    'Moby Dick',
    'Essays',
    'History',
    'Beloved',
    'The Tale of Genji',
    'The Man Without Qualities',
    'Lolita',
    'Nineteen Eighty-Four',
    'Metamorphoses',
    'The Book of Disquiet',
    'Tales',
    'In Search of Lost Time',
    'Gargantua and Pantagruel',
    'Pedro Páramo',
    'The Masnavi',
    "Midnight's Children",
    'Bostan',
    'Season of Migration to the North',
    'Blindness',
    'Hamlet',
    'King Lear',
    'Othello',
    'Oedipus the King',
    'The Red and the Black',
    'The Life And Opinions of Tristram Shandy',
    'Confessions of Zeno',
    "Gulliver's Travels",
    'War and Peace',
    'Anna Karenina',
    'The Death of Ivan Ilyich',
    'The Adventures of Huckleberry Finn',
    'Ramayana',
    'The Aeneid',
    'Mahabharata',
    'Leaves of Grass',
    'Mrs Dalloway',
    'To the Lighthouse',
    'Memoirs of Hadrian'
  ])
]
data.forEach(d => bktree.add(d))

const query = 'light'
const tolerance = 2
console.time('search')
const res = bktree.search(query, tolerance)
console.timeEnd('search')
console.log('Matches for', query, ':', res)
