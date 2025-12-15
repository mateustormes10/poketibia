export const PokemonDatabase = {

  Bulbasaur: {hp: 150,
    maxHP: 150, maxMana: 70, aggressive: false,
    speed: 0.055, attackBase: 1, deffenseBase: 2,
    elements: ["grass", "poison"],
    weakElements: ["fire", "psychic", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Chicote de Vinha", "Pó do Sono"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Ivysaur: {hp: 180,
    maxHP: 180, maxMana: 90, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 3,
    elements: ["grass", "poison"],
    weakElements: ["fire", "psychic", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Chicote de Vinha", "Pó Venenoso"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Venusaur: {hp: 220,
    maxHP: 220, maxMana: 120, aggressive: true,
    speed: 0.05, attackBase: 3, deffenseBase: 4,
    elements: ["grass", "poison"],
    weakElements: ["fire", "psychic", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Raio Solar"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Charmander: {hp: 140,
    maxHP: 140, maxMana: 60, aggressive: true,
    speed: 0.06, attackBase: 1, deffenseBase: 1,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Brasas", "Arranhão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Charmeleon: {hp: 180,
    maxHP: 180, maxMana: 80, aggressive: true,
    speed: 0.065, attackBase: 2, deffenseBase: 2,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Lança-Chamas"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Charizard: {hp: 230,
    maxHP: 230, maxMana: 120, aggressive: true,
    speed: 0.07, attackBase: 4, deffenseBase: 3,
    elements: ["fire", "flying"],
    weakElements: ["water", "electric", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Lança-Chamas", "Voo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Squirtle: {hp: 160,
    maxHP: 160, maxMana: 70, aggressive: false,
    speed: 0.05, attackBase: 1, deffenseBase: 3,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Jato de Água"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Wartortle: {hp: 190,
    maxHP: 190, maxMana: 90, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 4,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Jato de Água", "Giro Rápido"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Blastoise: {hp: 240,
    maxHP: 240, maxMana: 120, aggressive: true,
    speed: 0.05, attackBase: 3, deffenseBase: 5,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Hidro Bomba"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Caterpie: {hp: 90,
    maxHP: 90, maxMana: 30, aggressive: false,
    speed: 0.04, attackBase: 0, deffenseBase: 1,
    elements: ["bug"],
    weakElements: ["fire", "flying"],
    strongElements: ["grass"],
    skills: ["Investida"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Metapod: {hp: 110,
    maxHP: 110, maxMana: 20, aggressive: false,
    speed: 0.03, attackBase: 0, deffenseBase: 4,
    elements: ["bug"],
    weakElements: ["fire", "flying"],
    strongElements: ["grass"],
    skills: ["Endurecer"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Butterfree: {hp: 150,
    maxHP: 150, maxMana: 80, aggressive: false,
    speed: 0.06, attackBase: 2, deffenseBase: 2,
    elements: ["bug", "flying"],
    weakElements: ["fire", "electric", "rock"],
    strongElements: ["grass"],
    skills: ["Confusão", "Pó do Sono"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Weedle: {hp: 85,
    maxHP: 85, maxMana: 30, aggressive: false,
    speed: 0.045, attackBase: 1, deffenseBase: 0,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying"],
    strongElements: ["grass"],
    skills: ["Ferrão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Kakuna: {hp: 110,
    maxHP: 110, maxMana: 20, aggressive: false,
    speed: 0.03, attackBase: 0, deffenseBase: 4,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying"],
    strongElements: ["grass"],
    skills: ["Endurecer"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Beedrill: {hp: 170,
    maxHP: 170, maxMana: 70, aggressive: true,
    speed: 0.07, attackBase: 3, deffenseBase: 2,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying", "psychic"],
    strongElements: ["grass"],
    skills: ["Fúria do Ferrão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Pidgey: {hp: 100,
    maxHP: 100, maxMana: 40, aggressive: false,
    speed: 0.06, attackBase: 1, deffenseBase: 1,
    elements: ["normal", "flying"],
    weakElements: ["electric", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Rajada de Vento"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Pidgeotto: {hp: 150,
    maxHP: 150, maxMana: 60, aggressive: false,
    speed: 0.065, attackBase: 2, deffenseBase: 2,
    elements: ["normal", "flying"],
    weakElements: ["electric", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Ataque Aéreo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Pidgeot: {hp: 210,
    maxHP: 210, maxMana: 100, aggressive: true,
    speed: 0.075, attackBase: 4, deffenseBase: 3,
    elements: ["normal", "flying"],
    weakElements: ["electric", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Furacão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Rattata: {hp: 90,
    maxHP: 90, maxMana: 30, aggressive: true,
    speed: 0.065, attackBase: 1, deffenseBase: 0,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Mordida"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Raticate: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: true,
    speed: 0.07, attackBase: 3, deffenseBase: 2,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Super Mordida"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

    NidoranF: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.05, attackBase: 1, deffenseBase: 1,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Ferrão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Nidorina: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 2,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Mordida"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Nidoqueen: {hp: 230,
    maxHP: 230, maxMana: 90, aggressive: true,
    speed: 0.055, attackBase: 4, deffenseBase: 4,
    elements: ["poison", "ground"],
    weakElements: ["water", "ice", "ground", "psychic"],
    strongElements: ["electric", "rock"],
    skills: ["Terremoto"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  NidoranM: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.05, attackBase: 1, deffenseBase: 1,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Ferrão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Nidorino: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: true,
    speed: 0.06, attackBase: 3, deffenseBase: 2,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Chifre Duplo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Nidoking: {hp: 240,
    maxHP: 240, maxMana: 100, aggressive: true,
    speed: 0.06, attackBase: 5, deffenseBase: 3,
    elements: ["poison", "ground"],
    weakElements: ["water", "ice", "ground", "psychic"],
    strongElements: ["electric", "rock"],
    skills: ["Terremoto"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Clefairy: {hp: 170,
    maxHP: 170, maxMana: 100, aggressive: false,
    speed: 0.045, attackBase: 1, deffenseBase: 2,
    elements: ["fairy"],
    weakElements: ["poison"],
    strongElements: ["dragon"],
    skills: ["Canto"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Clefable: {hp: 240,
    maxHP: 240, maxMana: 130, aggressive: false,
    speed: 0.05, attackBase: 3, deffenseBase: 4,
    elements: ["fairy"],
    weakElements: ["poison"],
    strongElements: ["dragon"],
    skills: ["Explosão Lunar"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Vulpix: {hp: 130,
    maxHP: 130, maxMana: 60, aggressive: false,
    speed: 0.06, attackBase: 1, deffenseBase: 1,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Chama"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Ninetales: {hp: 210,
    maxHP: 210, maxMana: 120, aggressive: false,
    speed: 0.065, attackBase: 3, deffenseBase: 3,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Lança-Chamas"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Jigglypuff: {hp: 200,
    maxHP: 200, maxMana: 120, aggressive: false,
    speed: 0.04, attackBase: 1, deffenseBase: 1,
    elements: ["normal", "fairy"],
    weakElements: ["poison"],
    strongElements: ["dragon"],
    skills: ["Canção"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Wigglytuff: {hp: 300,
    maxHP: 300, maxMana: 140, aggressive: false,
    speed: 0.045, attackBase: 3, deffenseBase: 3,
    elements: ["normal", "fairy"],
    weakElements: ["poison"],
    strongElements: ["dragon"],
    skills: ["Canção Mortal"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Zubat: {hp: 100,
    maxHP: 100, maxMana: 40, aggressive: true,
    speed: 0.065, attackBase: 1, deffenseBase: 1,
    elements: ["poison", "flying"],
    weakElements: ["electric", "ice", "psychic"],
    strongElements: ["grass", "bug"],
    skills: ["Supersônico"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Golbat: {hp: 190,
    maxHP: 190, maxMana: 80, aggressive: true,
    speed: 0.07, attackBase: 3, deffenseBase: 2,
    elements: ["poison", "flying"],
    weakElements: ["electric", "ice", "psychic"],
    strongElements: ["grass", "bug"],
    skills: ["Mordida"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Oddish: {hp: 130,
    maxHP: 130, maxMana: 60, aggressive: false,
    speed: 0.045, attackBase: 1, deffenseBase: 1,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Absorver"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Gloom: {hp: 170,
    maxHP: 170, maxMana: 80, aggressive: false,
    speed: 0.045, attackBase: 2, deffenseBase: 2,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Pó Venenoso"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Vileplume: {hp: 220,
    maxHP: 220, maxMana: 110, aggressive: true,
    speed: 0.045, attackBase: 4, deffenseBase: 3,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Pétala Solar"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Paras: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.04, attackBase: 1, deffenseBase: 2,
    elements: ["bug", "grass"],
    weakElements: ["fire", "flying", "ice"],
    strongElements: ["water", "grass"],
    skills: ["Absorver"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Parasect: {hp: 200,
    maxHP: 200, maxMana: 70, aggressive: true,
    speed: 0.04, attackBase: 4, deffenseBase: 3,
    elements: ["bug", "grass"],
    weakElements: ["fire", "flying", "ice"],
    strongElements: ["water", "grass"],
    skills: ["Esporos"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Venonat: {hp: 140,
    maxHP: 140, maxMana: 50, aggressive: false,
    speed: 0.045, attackBase: 1, deffenseBase: 2,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying", "psychic"],
    strongElements: ["grass"],
    skills: ["Confusão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Venomoth: {hp: 180,
    maxHP: 180, maxMana: 90, aggressive: true,
    speed: 0.065, attackBase: 3, deffenseBase: 2,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying", "psychic"],
    strongElements: ["grass"],
    skills: ["Vento Prateado"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },
    Diglett: {hp: 100,
    maxHP: 100, maxMana: 30, aggressive: true,
    speed: 0.07, attackBase: 1, deffenseBase: 1,
    elements: ["ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["electric", "rock"],
    skills: ["Escavação"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Dugtrio: {hp: 180,
    maxHP: 180, maxMana: 50, aggressive: true,
    speed: 0.075, attackBase: 3, deffenseBase: 2,
    elements: ["ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["electric", "rock"],
    skills: ["Terremoto"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Meowth: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.07, attackBase: 1, deffenseBase: 1,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Arranhão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Persian: {hp: 200,
    maxHP: 200, maxMana: 70, aggressive: true,
    speed: 0.075, attackBase: 3, deffenseBase: 2,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Garra Furiosa"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Psyduck: {hp: 140,
    maxHP: 140, maxMana: 80, aggressive: false,
    speed: 0.05, attackBase: 1, deffenseBase: 1,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Confusão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Golduck: {hp: 220,
    maxHP: 220, maxMana: 120, aggressive: true,
    speed: 0.06, attackBase: 4, deffenseBase: 3,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Hidro Bomba"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Mankey: {hp: 130,
    maxHP: 130, maxMana: 40, aggressive: true,
    speed: 0.065, attackBase: 2, deffenseBase: 1,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["normal", "rock"],
    skills: ["Golpe Karate"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Primeape: {hp: 210,
    maxHP: 210, maxMana: 70, aggressive: true,
    speed: 0.07, attackBase: 4, deffenseBase: 2,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["normal", "rock"],
    skills: ["Fúria"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Growlithe: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: false,
    speed: 0.06, attackBase: 2, deffenseBase: 2,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Mordida"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Arcanine: {hp: 260,
    maxHP: 260, maxMana: 120, aggressive: true,
    speed: 0.07, attackBase: 5, deffenseBase: 4,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Lança-Chamas"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Poliwag: {hp: 130,
    maxHP: 130, maxMana: 50, aggressive: false,
    speed: 0.055, attackBase: 1, deffenseBase: 1,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Bolhas"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Poliwhirl: {hp: 180,
    maxHP: 180, maxMana: 70, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Hipnose"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Poliwrath: {hp: 260,
    maxHP: 260, maxMana: 90, aggressive: true,
    speed: 0.055, attackBase: 5, deffenseBase: 4,
    elements: ["water", "fighting"],
    weakElements: ["electric", "grass", "psychic"],
    strongElements: ["fire", "rock", "normal"],
    skills: ["Soco Dinâmico"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Abra: {hp: 90,
    maxHP: 90, maxMana: 120, aggressive: false,
    speed: 0.06, attackBase: 1, deffenseBase: 1,
    elements: ["psychic"],
    weakElements: ["bug", "ghost", "dark"],
    strongElements: ["fighting", "poison"],
    skills: ["Teleporte"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Kadabra: {hp: 140,
    maxHP: 140, maxMana: 160, aggressive: true,
    speed: 0.065, attackBase: 3, deffenseBase: 2,
    elements: ["psychic"],
    weakElements: ["bug", "ghost", "dark"],
    strongElements: ["fighting", "poison"],
    skills: ["Confusão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Alakazam: {hp: 200,
    maxHP: 200, maxMana: 220, aggressive: true,
    speed: 0.07, attackBase: 5, deffenseBase: 3,
    elements: ["psychic"],
    weakElements: ["bug", "ghost", "dark"],
    strongElements: ["fighting", "poison"],
    skills: ["Psíquico"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Machop: {hp: 160,
    maxHP: 160, maxMana: 40, aggressive: true,
    speed: 0.05, attackBase: 2, deffenseBase: 2,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["normal", "rock"],
    skills: ["Soco"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Machoke: {hp: 220,
    maxHP: 220, maxMana: 60, aggressive: true,
    speed: 0.05, attackBase: 4, deffenseBase: 3,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["normal", "rock"],
    skills: ["Golpe Cruzado"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Machamp: {hp: 300,
    maxHP: 300, maxMana: 80, aggressive: true,
    speed: 0.05, attackBase: 6, deffenseBase: 4,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["normal", "rock"],
    skills: ["Soco Dinâmico"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },
    Bellsprout: {hp: 120,
    maxHP: 120, maxMana: 60, aggressive: true,
    speed: 0.05, attackBase: 1, deffenseBase: 1,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying", "psychic"],
    strongElements: ["water", "rock"],
    skills: ["Chicote de Vinha"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Weepinbell: {hp: 180,
    maxHP: 180, maxMana: 80, aggressive: true,
    speed: 0.055, attackBase: 3, deffenseBase: 2,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying", "psychic"],
    strongElements: ["water", "rock"],
    skills: ["Folha Navalha"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Victreebel: {hp: 260,
    maxHP: 260, maxMana: 120, aggressive: true,
    speed: 0.055, attackBase: 5, deffenseBase: 3,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying", "psychic"],
    strongElements: ["water", "rock"],
    skills: ["Raio Solar"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Tentacool: {hp: 140,
    maxHP: 140, maxMana: 90, aggressive: false,
    speed: 0.055, attackBase: 1, deffenseBase: 2,
    elements: ["water", "poison"],
    weakElements: ["electric", "psychic", "ground"],
    strongElements: ["fire", "water"],
    skills: ["Ácido"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Tentacruel: {hp: 260,
    maxHP: 260, maxMana: 140, aggressive: true,
    speed: 0.06, attackBase: 4, deffenseBase: 4,
    elements: ["water", "poison"],
    weakElements: ["electric", "psychic", "ground"],
    strongElements: ["fire", "water"],
    skills: ["Hidro Bomba"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Geodude: {hp: 160,
    maxHP: 160, maxMana: 40, aggressive: true,
    speed: 0.045, attackBase: 2, deffenseBase: 3,
    elements: ["rock", "ground"],
    weakElements: ["water", "grass", "ice", "fighting"],
    strongElements: ["fire", "electric"],
    skills: ["Pedrada"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Graveler: {hp: 220,
    maxHP: 220, maxMana: 60, aggressive: true,
    speed: 0.045, attackBase: 4, deffenseBase: 4,
    elements: ["rock", "ground"],
    weakElements: ["water", "grass", "ice", "fighting"],
    strongElements: ["fire", "electric"],
    skills: ["Deslizamento de Rochas"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Golem: {hp: 320,
    maxHP: 320, maxMana: 80, aggressive: true,
    speed: 0.045, attackBase: 6, deffenseBase: 5,
    elements: ["rock", "ground"],
    weakElements: ["water", "grass", "ice", "fighting"],
    strongElements: ["fire", "electric"],
    skills: ["Terremoto"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Ponyta: {hp: 150,
    maxHP: 150, maxMana: 60, aggressive: false,
    speed: 0.065, attackBase: 2, deffenseBase: 2,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Chamas"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Rapidash: {hp: 260,
    maxHP: 260, maxMana: 90, aggressive: true,
    speed: 0.075, attackBase: 5, deffenseBase: 3,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Lança-Chamas"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Slowpoke: {hp: 200,
    maxHP: 200, maxMana: 80, aggressive: false,
    speed: 0.035, attackBase: 1, deffenseBase: 3,
    elements: ["water", "psychic"],
    weakElements: ["electric", "grass", "bug", "ghost"],
    strongElements: ["fire", "fighting"],
    skills: ["Confusão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Slowbro: {hp: 320,
    maxHP: 320, maxMana: 140, aggressive: true,
    speed: 0.035, attackBase: 4, deffenseBase: 5,
    elements: ["water", "psychic"],
    weakElements: ["electric", "grass", "bug", "ghost"],
    strongElements: ["fire", "fighting"],
    skills: ["Psíquico"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Magnemite: {hp: 130,
    maxHP: 130, maxMana: 80, aggressive: false,
    speed: 0.05, attackBase: 2, deffenseBase: 3,
    elements: ["electric", "steel"],
    weakElements: ["fire", "ground"],
    strongElements: ["water", "flying"],
    skills: ["Choque do Trovão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Magneton: {hp: 220,
    maxHP: 220, maxMana: 120, aggressive: true,
    speed: 0.05, attackBase: 4, deffenseBase: 4,
    elements: ["electric", "steel"],
    weakElements: ["fire", "ground"],
    strongElements: ["water", "flying"],
    skills: ["Raio"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Farfetchd: {hp: 150,
    maxHP: 150, maxMana: 50, aggressive: false,
    speed: 0.06, attackBase: 2, deffenseBase: 2,
    elements: ["normal", "flying"],
    weakElements: ["electric", "ice", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Corte"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Doduo: {hp: 150,
    maxHP: 150, maxMana: 40, aggressive: true,
    speed: 0.07, attackBase: 2, deffenseBase: 1,
    elements: ["normal", "flying"],
    weakElements: ["electric", "ice", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Ataque Duplo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Dodrio: {hp: 240,
    maxHP: 240, maxMana: 60, aggressive: true,
    speed: 0.075, attackBase: 5, deffenseBase: 2,
    elements: ["normal", "flying"],
    weakElements: ["electric", "ice", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Ataque Triplo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Seel: {hp: 180,
    maxHP: 180, maxMana: 60, aggressive: false,
    speed: 0.045, attackBase: 2, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Raio Aurora"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Dewgong: {hp: 300,
    maxHP: 300, maxMana: 120, aggressive: true,
    speed: 0.045, attackBase: 4, deffenseBase: 4,
    elements: ["water", "ice"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire", "ground"],
    skills: ["Nevasca"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Grimer: {hp: 200,
    maxHP: 200, maxMana: 40, aggressive: true,
    speed: 0.035, attackBase: 2, deffenseBase: 3,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass", "fairy"],
    skills: ["Lama Tóxica"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Muk: {hp: 320,
    maxHP: 320, maxMana: 60, aggressive: true,
    speed: 0.035, attackBase: 5, deffenseBase: 5,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass", "fairy"],
    skills: ["Ácido"],
    spriteList: { up: [], down: [], left: [], right: [] }
  }, 
  Shellder: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.03, attackBase: 2, deffenseBase: 4,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Rajada de Água"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Cloyster: {hp: 260,
    maxHP: 260, maxMana: 80, aggressive: true,
    speed: 0.03, attackBase: 4, deffenseBase: 6,
    elements: ["water", "ice"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire", "ground"],
    skills: ["Lança de Gelo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Gastly: {hp: 100,
    maxHP: 100, maxMana: 100, aggressive: true,
    speed: 0.06, attackBase: 3, deffenseBase: 1,
    elements: ["ghost", "poison"],
    weakElements: ["psychic", "ghost"],
    strongElements: ["grass", "fairy"],
    skills: ["Assombrar"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Haunter: {hp: 160,
    maxHP: 160, maxMana: 140, aggressive: true,
    speed: 0.065, attackBase: 4, deffenseBase: 2,
    elements: ["ghost", "poison"],
    weakElements: ["psychic", "ghost"],
    strongElements: ["grass", "fairy"],
    skills: ["Bola Sombria"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Gengar: {hp: 260,
    maxHP: 260, maxMana: 200, aggressive: true,
    speed: 0.07, attackBase: 6, deffenseBase: 3,
    elements: ["ghost", "poison"],
    weakElements: ["psychic", "ghost"],
    strongElements: ["grass", "fairy"],
    skills: ["Pesadelo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Onix: {hp: 240,
    maxHP: 240, maxMana: 40, aggressive: false,
    speed: 0.05, attackBase: 3, deffenseBase: 6,
    elements: ["rock", "ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Investida"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Drowzee: {hp: 160,
    maxHP: 160, maxMana: 120, aggressive: false,
    speed: 0.045, attackBase: 2, deffenseBase: 2,
    elements: ["psychic"],
    weakElements: ["bug", "ghost"],
    strongElements: ["fighting"],
    skills: ["Hipnose"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Hypno: {hp: 280,
    maxHP: 280, maxMana: 200, aggressive: true,
    speed: 0.045, attackBase: 4, deffenseBase: 4,
    elements: ["psychic"],
    weakElements: ["bug", "ghost"],
    strongElements: ["fighting"],
    skills: ["Confusão Profunda"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Krabby: {hp: 140,
    maxHP: 140, maxMana: 40, aggressive: true,
    speed: 0.055, attackBase: 3, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Garra"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Kingler: {hp: 280,
    maxHP: 280, maxMana: 60, aggressive: true,
    speed: 0.055, attackBase: 6, deffenseBase: 4,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Martelo Caranguejo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Voltorb: {hp: 120,
    maxHP: 120, maxMana: 80, aggressive: true,
    speed: 0.065, attackBase: 2, deffenseBase: 2,
    elements: ["electric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],
    skills: ["Carga"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Electrode: {hp: 200,
    maxHP: 200, maxMana: 120, aggressive: true,
    speed: 0.08, attackBase: 4, deffenseBase: 3,
    elements: ["electric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],
    skills: ["Explosão Elétrica"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Exeggcute: {hp: 180,
    maxHP: 180, maxMana: 100, aggressive: false,
    speed: 0.035, attackBase: 2, deffenseBase: 3,
    elements: ["grass", "psychic"],
    weakElements: ["fire", "bug", "ice"],
    strongElements: ["water", "ground"],
    skills: ["Semente Psíquica"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Exeggutor: {hp: 340,
    maxHP: 340, maxMana: 180, aggressive: true,
    speed: 0.035, attackBase: 5, deffenseBase: 4,
    elements: ["grass", "psychic"],
    weakElements: ["fire", "bug", "ice"],
    strongElements: ["water", "ground"],
    skills: ["Raio Solar"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Cubone: {hp: 160,
    maxHP: 160, maxMana: 40, aggressive: false,
    speed: 0.045, attackBase: 3, deffenseBase: 3,
    elements: ["ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Osso Bumerangue"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Marowak: {hp: 300,
    maxHP: 300, maxMana: 60, aggressive: true,
    speed: 0.045, attackBase: 5, deffenseBase: 4,
    elements: ["ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Clava Óssea"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Hitmonlee: {hp: 260,
    maxHP: 260, maxMana: 60, aggressive: true,
    speed: 0.065, attackBase: 6, deffenseBase: 2,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["rock", "ice"],
    skills: ["Chute Giratório"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Hitmonchan: {hp: 260,
    maxHP: 260, maxMana: 60, aggressive: true,
    speed: 0.06, attackBase: 5, deffenseBase: 3,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["rock", "ice"],
    skills: ["Soco Dinâmico"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Lickitung: {hp: 300,
    maxHP: 300, maxMana: 40, aggressive: false,
    speed: 0.035, attackBase: 3, deffenseBase: 3,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Lambida"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Koffing: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: true,
    speed: 0.035, attackBase: 2, deffenseBase: 3,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Gás Venenoso"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Weezing: {hp: 300,
    maxHP: 300, maxMana: 100, aggressive: true,
    speed: 0.035, attackBase: 4, deffenseBase: 5,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Explosão Tóxica"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Rhyhorn: {hp: 260,
    maxHP: 260, maxMana: 40, aggressive: true,
    speed: 0.035, attackBase: 4, deffenseBase: 5,
    elements: ["ground", "rock"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Investida"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Rhydon: {hp: 380,
    maxHP: 380, maxMana: 60, aggressive: true,
    speed: 0.035, attackBase: 6, deffenseBase: 6,
    elements: ["ground", "rock"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Terremoto"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Chansey: {hp: 500,
    maxHP: 500, maxMana: 200, aggressive: false,
    speed: 0.03, attackBase: 1, deffenseBase: 4,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Cura"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Tangela: {hp: 260,
    maxHP: 260, maxMana: 100, aggressive: false,
    speed: 0.035, attackBase: 3, deffenseBase: 5,
    elements: ["grass"],
    weakElements: ["fire", "ice", "flying"],
    strongElements: ["water", "ground"],
    skills: ["Chicote de Vinha"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Kangaskhan: {hp: 380,
    maxHP: 380, maxMana: 60, aggressive: true,
    speed: 0.05, attackBase: 5, deffenseBase: 4,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Soco Pesado"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Horsea: {hp: 140,
    maxHP: 140, maxMana: 80, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Jato d'Água"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Seadra: {hp: 260,
    maxHP: 260, maxMana: 140, aggressive: true,
    speed: 0.055, attackBase: 4, deffenseBase: 4,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Hidro Pulso"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Goldeen: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Chifre d'Água"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Seaking: {hp: 280,
    maxHP: 280, maxMana: 80, aggressive: true,
    speed: 0.055, attackBase: 5, deffenseBase: 3,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Megachifre"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Staryu: {hp: 300,
    maxHP: 300, maxMana: 200, aggressive: true,
    speed: 0.07, attackBase: 4, deffenseBase: 4,
    elements: ["water", "psychic"],
    weakElements: ["electric", "grass", "ghost"],
    strongElements: ["fire", "fighting"],
    skills: ["Psíquico"],
    spriteList: { up:    [33648, 33652, 33656],
            down:  [33650, 33654, 33658],
            left:  [33651, 33655, 33659],
            right: [33649, 33653, 33657] }
  },

  Starmie: {hp: 300,
    maxHP: 300, maxMana: 200, aggressive: true,
    speed: 0.07, attackBase: 4, deffenseBase: 4,
    elements: ["water", "psychic"],
    weakElements: ["electric", "grass", "ghost"],
    strongElements: ["fire", "fighting"],
    skills: ["Psíquico"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  MrMime: {hp: 260,
    maxHP: 260, maxMana: 220, aggressive: false,
    speed: 0.05, attackBase: 3, deffenseBase: 4,
    elements: ["psychic", "fairy"],
    weakElements: ["ghost", "steel"],
    strongElements: ["fighting"],
    skills: ["Barreira"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Scyther: {hp: 280,
    maxHP: 280, maxMana: 80, aggressive: true,
    speed: 0.075, attackBase: 6, deffenseBase: 3,
    elements: ["bug", "flying"],
    weakElements: ["fire", "rock", "electric"],
    strongElements: ["grass", "psychic"],
    skills: ["Corte Duplo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Jynx: {hp: 260,
    maxHP: 260, maxMana: 200, aggressive: true,
    speed: 0.05, attackBase: 4, deffenseBase: 3,
    elements: ["ice", "psychic"],
    weakElements: ["fire", "steel", "ghost"],
    strongElements: ["dragon", "grass"],
    skills: ["Beijo Congelante"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Electabuzz: {hp: 280,
    maxHP: 280, maxMana: 120, aggressive: true,
    speed: 0.07, attackBase: 5, deffenseBase: 3,
    elements: ["electric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],
    skills: ["Soco Trovão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Magmar: {hp: 280,
    maxHP: 280, maxMana: 120, aggressive: true,
    speed: 0.065, attackBase: 5, deffenseBase: 3,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "ice"],
    skills: ["Explosão de Fogo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Pinsir: {hp: 300,
    maxHP: 300, maxMana: 60, aggressive: true,
    speed: 0.06, attackBase: 6, deffenseBase: 4,
    elements: ["bug"],
    weakElements: ["fire", "flying"],
    strongElements: ["grass", "psychic"],
    skills: ["Guilhotina"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Tauros: {hp: 320,
    maxHP: 320, maxMana: 40, aggressive: true,
    speed: 0.07, attackBase: 5, deffenseBase: 4,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Investida Brutal"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },
  Pikachu: {hp: 120,
    maxHP: 120,
    maxMana: 80,
    aggressive: false,
    speed: 0.07,
    attackBase: 1,
    deffenseBase: 1,

    elements: ["eletric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],

    skills: ["Choque do Trovão", "Cauda de Ferro"],

    spriteList: {
        up:    [39664, 39668, 39672],
        down:  [39666, 39670, 39674],
        left:  [39667, 39671, 39675],
        right: [39665, 39669, 39673]
    }
    },

    Raichu: {hp: 180,
        maxHP: 180,
        maxMana: 110,
        aggressive: true,
        speed: 0.075,
        attackBase: 2,
        deffenseBase: 1,

        elements: ["eletric"],
        weakElements: ["ground"],
        strongElements: ["water", "flying"],

        skills: ["Choque do Trovão", "Cauda de Ferro", "Impacto Relâmpago"],

        spriteList: {
            up:    [39700, 39704, 39708],
            down:  [39702, 39706, 39710],
            left:  [39703, 39707, 39711],
            right: [39701, 39705, 39709]
        }
    },


  Magikarp: {hp: 80,
    maxHP: 80, maxMana: 10, aggressive: false,
    speed: 0.02, attackBase: 0, deffenseBase: 0,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: [],
    skills: ["Splash"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Gyarados: {hp: 420,
    maxHP: 420, maxMana: 120, aggressive: true,
    speed: 0.065, attackBase: 7, deffenseBase: 5,
    elements: ["water", "flying"],
    weakElements: ["electric"],
    strongElements: ["fire", "ground"],
    skills: ["Hidro Bomba"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Lapras: {hp: 420,
    maxHP: 420, maxMana: 200, aggressive: false,
    speed: 0.045, attackBase: 4, deffenseBase: 5,
    elements: ["water", "ice"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire", "ground"],
    skills: ["Canto Congelante"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Ditto: {hp: 200,
    maxHP: 200, maxMana: 200, aggressive: false,
    speed: 0.05, attackBase: 3, deffenseBase: 3,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Transformar"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Eevee: {hp: 180,
    maxHP: 180, maxMana: 80, aggressive: false,
    speed: 0.06, attackBase: 2, deffenseBase: 2,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Investida"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Vaporeon: {hp: 360,
    maxHP: 360, maxMana: 200, aggressive: false,
    speed: 0.045, attackBase: 4, deffenseBase: 4,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Hidro Pulso"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Jolteon: {hp: 280,
    maxHP: 280, maxMana: 160, aggressive: true,
    speed: 0.08, attackBase: 5, deffenseBase: 3,
    elements: ["electric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],
    skills: ["Raio"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Flareon: {hp: 300,
    maxHP: 300, maxMana: 120, aggressive: true,
    speed: 0.055, attackBase: 6, deffenseBase: 3,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "ice"],
    skills: ["Lança-Chamas"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Porygon: {hp: 260,
    maxHP: 260, maxMana: 160, aggressive: false,
    speed: 0.035, attackBase: 3, deffenseBase: 4,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Conversão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Omanyte: {hp: 200,
    maxHP: 200, maxMana: 80, aggressive: false,
    speed: 0.03, attackBase: 2, deffenseBase: 4,
    elements: ["rock", "water"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire"],
    skills: ["Jato d'Água"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Omastar: {hp: 340,
    maxHP: 340, maxMana: 120, aggressive: true,
    speed: 0.03, attackBase: 5, deffenseBase: 6,
    elements: ["rock", "water"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire"],
    skills: ["Hidro Canhão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Kabuto: {hp: 200,
    maxHP: 200, maxMana: 60, aggressive: false,
    speed: 0.035, attackBase: 3, deffenseBase: 4,
    elements: ["rock", "water"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire"],
    skills: ["Corte"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Kabutops: {hp: 320,
    maxHP: 320, maxMana: 80, aggressive: true,
    speed: 0.06, attackBase: 6, deffenseBase: 4,
    elements: ["rock", "water"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire"],
    skills: ["Lâmina de Água"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Aerodactyl: {hp: 340,
    maxHP: 340, maxMana: 80, aggressive: true,
    speed: 0.085, attackBase: 6, deffenseBase: 3,
    elements: ["rock", "flying"],
    weakElements: ["electric", "water", "ice"],
    strongElements: ["fire", "bug"],
    skills: ["Ataque Aéreo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Snorlax: {hp: 520,
    maxHP: 520, maxMana: 60, aggressive: false,
    speed: 0.02, attackBase: 5, deffenseBase: 6,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Descanso"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Articuno: {hp: 420,
    maxHP: 420, maxMana: 260, aggressive: true,
    speed: 0.055, attackBase: 6, deffenseBase: 5,
    elements: ["ice", "flying"],
    weakElements: ["fire", "electric", "rock"],
    strongElements: ["grass", "dragon"],
    skills: ["Nevasca"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Zapdos: {hp: 420,
    maxHP: 420, maxMana: 260, aggressive: true,
    speed: 0.065, attackBase: 6, deffenseBase: 5,
    elements: ["electric", "flying"],
    weakElements: ["ice", "rock"],
    strongElements: ["water", "flying"],
    skills: ["Tempestade Elétrica"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Moltres: {hp: 420,
    maxHP: 420, maxMana: 260, aggressive: true,
    speed: 0.065, attackBase: 6, deffenseBase: 5,
    elements: ["fire", "flying"],
    weakElements: ["water", "electric", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Chamas Eternas"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Dratini: {hp: 180,
    maxHP: 180, maxMana: 100, aggressive: false,
    speed: 0.045, attackBase: 3, deffenseBase: 2,
    elements: ["dragon"],
    weakElements: ["ice", "dragon"],
    strongElements: ["fire", "water"],
    skills: ["Pulso do Dragão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Dragonair: {hp: 300,
    maxHP: 300, maxMana: 160, aggressive: false,
    speed: 0.05, attackBase: 4, deffenseBase: 4,
    elements: ["dragon"],
    weakElements: ["ice", "dragon"],
    strongElements: ["fire", "water"],
    skills: ["Onda Dragão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Dragonite: {hp: 420,
    maxHP: 420, maxMana: 200, aggressive: true,
    speed: 0.06, attackBase: 7, deffenseBase: 5,
    elements: ["dragon", "flying"],
    weakElements: ["ice", "dragon", "rock"],
    strongElements: ["fire", "water"],
    skills: ["Fúria do Dragão"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Mewtwo: {hp: 520,
    maxHP: 520, maxMana: 400, aggressive: true,
    speed: 0.07, attackBase: 8, deffenseBase: 6,
    elements: ["psychic"],
    weakElements: ["ghost", "bug"],
    strongElements: ["fighting"],
    skills: ["Psíquico Supremo"],
    spriteList: { up: [], down: [], left: [], right: [] }
  },

  Mew: {hp: 480,
    maxHP: 480, maxMana: 480, aggressive: false,
    speed: 0.075, attackBase: 6, deffenseBase: 6,
    elements: ["psychic"],
    weakElements: ["ghost", "bug"],
    strongElements: ["fighting"],
    skills: ["Origem Psíquica"],
    spriteList: { up: [], down: [], left: [], right: [] }
  }
};
