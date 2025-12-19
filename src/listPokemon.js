export const PokemonDatabase = {

  Bulbasaur: {hp: 150,
    maxHP: 150, maxMana: 70, aggressive: false,
    speed: 0.055, attackBase: 1, deffenseBase: 2,
    elements: ["grass", "poison"],
    weakElements: ["fire", "psychic", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Chicote de Vinha", "Pó do Sono"],
    spriteList: {
            up: [
              [33242, 0, 0],
              [33246, 0, 0],
              [33250, 0, 0]],
            down:    [
              [33244, 0, 0], 
              [33248, 0, 0], 
              [33252, 0, 0]],
            left:    [
              [33245, 0, 0], 
              [33249, 0, 0], 
              [33253, 0, 0]],
            right:    [
              [33243, 0, 0], 
              [33247, 0, 0],
              [33251, 0, 0]] 
          }
  },

  Ivysaur: {hp: 180,
    maxHP: 180, maxMana: 90, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 3,
    elements: ["grass", "poison"],
    weakElements: ["fire", "psychic", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Chicote de Vinha", "Pó Venenoso"],
    spriteList: {
            up: [
              [33230, 0, 0],
              [33234, 0, 0],
              [33238, 0, 0]],
            down:    [
              [33232, 0, 0], 
              [33236, 0, 0], 
              [33240, 0, 0]],
            left:    [
              [33233, 0, 0], 
              [33237, 0, 0], 
              [33241, 0, 0]],
            right:    [
              [33231, 0, 0], 
              [33235, 0, 0],
              [33239, 0, 0]] 
          }
  },

  Venusaur: {hp: 220,
    maxHP: 220, maxMana: 120, aggressive: true,
    speed: 0.05, attackBase: 3, deffenseBase: 4,
    elements: ["grass", "poison"],
    weakElements: ["fire", "psychic", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Raio Solar"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Charmander: {hp: 140,
    maxHP: 140, maxMana: 60, aggressive: true,
    speed: 0.06, attackBase: 1, deffenseBase: 1,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Brasas", "Arranhão"],
    spriteList: {
            up: [
              [33356, 0, 0],
              [33360, 0, 0],
              [33364, 0, 0]],
            down:    [
              [33358, 0, 0], 
              [33362, 0, 0], 
              [33366, 0, 0]],
            left:    [
              [33359, 0, 0], 
              [33363, 0, 0], 
              [33367, 0, 0]],
            right:    [
              [33357, 0, 0], 
              [33361, 0, 0],
              [33365, 0, 0]] 
          }
  },

  Charmeleon: {hp: 180,
    maxHP: 180, maxMana: 80, aggressive: true,
    speed: 0.065, attackBase: 2, deffenseBase: 2,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Lança-Chamas"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Charizard: {hp: 230,
    maxHP: 230, maxMana: 120, aggressive: true,
    speed: 0.07, attackBase: 4, deffenseBase: 3,
    elements: ["fire", "flying"],
    weakElements: ["water", "electric", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Lança-Chamas", "Voo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Squirtle: {hp: 160,
    maxHP: 160, maxMana: 70, aggressive: false,
    speed: 0.05, attackBase: 1, deffenseBase: 3,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Jato de Água"],
    spriteList: {
            up: [
              [32582, 0, 0],
              [32586, 0, 0],
              [32590, 0, 0]],
            down:    [
              [32584, 0, 0], 
              [32588, 0, 0], 
              [32592, 0, 0]],
            left:    [
              [32585, 0, 0], 
              [32589, 0, 0], 
              [32593, 0, 0]],
            right:    [
              [32583, 0, 0], 
              [32587, 0, 0],
              [32591, 0, 0]] 
          }
  },

  Wartortle: {hp: 190,
    maxHP: 190, maxMana: 90, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 4,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Jato de Água", "Giro Rápido"],
    spriteList: {
            up: [
              [32667, 0, 0],
              [32671, 0, 0],
              [32675, 0, 0]],
            down:    [
              [32669, 0, 0], 
              [32673, 0, 0], 
              [32677, 0, 0]],
            left:    [
              [32670, 0, 0], 
              [32674, 0, 0], 
              [32678, 0, 0]],
            right:    [
              [32668, 0, 0], 
              [32672, 0, 0],
              [32676, 0, 0]] 
          }
  },

  Blastoise: {hp: 240,
    maxHP: 240, maxMana: 120, aggressive: true,
    speed: 0.05, attackBase: 3, deffenseBase: 5,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Hidro Bomba"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Caterpie: {hp: 90,
    maxHP: 90, maxMana: 30, aggressive: false,
    speed: 0.04, attackBase: 0, deffenseBase: 1,
    elements: ["bug"],
    weakElements: ["fire", "flying"],
    strongElements: ["grass"],
    skills: ["Investida"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Metapod: {hp: 110,
    maxHP: 110, maxMana: 20, aggressive: false,
    speed: 0.03, attackBase: 0, deffenseBase: 4,
    elements: ["bug"],
    weakElements: ["fire", "flying"],
    strongElements: ["grass"],
    skills: ["Endurecer"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Butterfree: {hp: 150,
    maxHP: 150, maxMana: 80, aggressive: false,
    speed: 0.06, attackBase: 2, deffenseBase: 2,
    elements: ["bug", "flying"],
    weakElements: ["fire", "electric", "rock"],
    strongElements: ["grass"],
    skills: ["Confusão", "Pó do Sono"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Weedle: {hp: 85,
    maxHP: 85, maxMana: 30, aggressive: false,
    speed: 0.045, attackBase: 1, deffenseBase: 0,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying"],
    strongElements: ["grass"],
    skills: ["Ferrão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Kakuna: {hp: 110,
    maxHP: 110, maxMana: 20, aggressive: false,
    speed: 0.03, attackBase: 0, deffenseBase: 4,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying"],
    strongElements: ["grass"],
    skills: ["Endurecer"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Beedrill: {hp: 170,
    maxHP: 170, maxMana: 70, aggressive: true,
    speed: 0.07, attackBase: 3, deffenseBase: 2,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying", "psychic"],
    strongElements: ["grass"],
    skills: ["Fúria do Ferrão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Pidgey: {hp: 100,
    maxHP: 100, maxMana: 40, aggressive: false,
    speed: 0.06, attackBase: 1, deffenseBase: 1,
    elements: ["normal", "flying"],
    weakElements: ["electric", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Rajada de Vento"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Pidgeotto: {hp: 150,
    maxHP: 150, maxMana: 60, aggressive: false,
    speed: 0.065, attackBase: 2, deffenseBase: 2,
    elements: ["normal", "flying"],
    weakElements: ["electric", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Ataque Aéreo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Pidgeot: {hp: 210,
    maxHP: 210, maxMana: 100, aggressive: true,
    speed: 0.075, attackBase: 4, deffenseBase: 3,
    elements: ["normal", "flying"],
    weakElements: ["electric", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Furacão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Rattata: {hp: 90,
    maxHP: 90, maxMana: 30, aggressive: true,
    speed: 0.065, attackBase: 1, deffenseBase: 0,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Mordida"],
    spriteList: {
            up: [
              [33533, 0, 0],
              [33537, 0, 0],
              [33541, 0, 0]],
            down:    [
              [33535, 0, 0], 
              [33539, 0, 0], 
              [33543, 0, 0]],
            left:    [
              [33536, 0, 0], 
              [33540, 0, 0], 
              [33544, 0, 0]],
            right:    [
              [33538, 0, 0], 
              [33542, 0, 0],
              [33546, 0, 0]] 
          }
  },

  Raticate: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: true,
    speed: 0.07, attackBase: 3, deffenseBase: 2,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Super Mordida"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

    NidoranF: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.05, attackBase: 1, deffenseBase: 1,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Ferrão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Nidorina: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 2,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Mordida"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Nidoqueen: {hp: 230,
    maxHP: 230, maxMana: 90, aggressive: true,
    speed: 0.055, attackBase: 4, deffenseBase: 4,
    elements: ["poison", "ground"],
    weakElements: ["water", "ice", "ground", "psychic"],
    strongElements: ["electric", "rock"],
    skills: ["Terremoto"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  NidoranM: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.05, attackBase: 1, deffenseBase: 1,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Ferrão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Nidorino: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: true,
    speed: 0.06, attackBase: 3, deffenseBase: 2,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Chifre Duplo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Nidoking: {hp: 240,
    maxHP: 240, maxMana: 100, aggressive: true,
    speed: 0.06, attackBase: 5, deffenseBase: 3,
    elements: ["poison", "ground"],
    weakElements: ["water", "ice", "ground", "psychic"],
    strongElements: ["electric", "rock"],
    skills: ["Terremoto"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Clefairy: {hp: 170,
    maxHP: 170, maxMana: 100, aggressive: false,
    speed: 0.045, attackBase: 1, deffenseBase: 2,
    elements: ["fairy"],
    weakElements: ["poison"],
    strongElements: ["dragon"],
    skills: ["Canto"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Clefable: {hp: 240,
    maxHP: 240, maxMana: 130, aggressive: false,
    speed: 0.05, attackBase: 3, deffenseBase: 4,
    elements: ["fairy"],
    weakElements: ["poison"],
    strongElements: ["dragon"],
    skills: ["Explosão Lunar"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Vulpix: {hp: 130,
    maxHP: 130, maxMana: 60, aggressive: false,
    speed: 0.06, attackBase: 1, deffenseBase: 1,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Chama"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Ninetales: {hp: 210,
    maxHP: 210, maxMana: 120, aggressive: false,
    speed: 0.065, attackBase: 3, deffenseBase: 3,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Lança-Chamas"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Jigglypuff: {hp: 200,
    maxHP: 200, maxMana: 120, aggressive: false,
    speed: 0.04, attackBase: 1, deffenseBase: 1,
    elements: ["normal", "fairy"],
    weakElements: ["poison"],
    strongElements: ["dragon"],
    skills: ["Canção"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Wigglytuff: {hp: 300,
    maxHP: 300, maxMana: 140, aggressive: false,
    speed: 0.045, attackBase: 3, deffenseBase: 3,
    elements: ["normal", "fairy"],
    weakElements: ["poison"],
    strongElements: ["dragon"],
    skills: ["Canção Mortal"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Zubat: {hp: 100,
    maxHP: 100, maxMana: 40, aggressive: true,
    speed: 0.065, attackBase: 1, deffenseBase: 1,
    elements: ["poison", "flying"],
    weakElements: ["electric", "ice", "psychic"],
    strongElements: ["grass", "bug"],
    skills: ["Supersônico"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  
  Shiny_Zubat: {hp: 100,
    maxHP: 100, maxMana: 40, aggressive: true,
    speed: 0.065, attackBase: 1, deffenseBase: 1,
    elements: ["poison", "flying"],
    weakElements: ["electric", "ice", "psychic"],
    strongElements: ["grass", "bug"],
    skills: ["Supersônico"],
    spriteList: {
            up:    [46027, 46031],
            down:  [46029, 46033],
            left:  [46030, 46034],
            right: [46028, 46032] 
          }
  },

  Golbat: {hp: 190,
    maxHP: 190, maxMana: 80, aggressive: true,
    speed: 0.07, attackBase: 3, deffenseBase: 2,
    elements: ["poison", "flying"],
    weakElements: ["electric", "ice", "psychic"],
    strongElements: ["grass", "bug"],
    skills: ["Mordida"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Oddish: {hp: 130,
    maxHP: 130, maxMana: 60, aggressive: false,
    speed: 0.045, attackBase: 1, deffenseBase: 1,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Absorver"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Shiny_Oddish: {hp: 130,
    maxHP: 130, maxMana: 60, aggressive: false,
    speed: 0.045, attackBase: 1, deffenseBase: 1,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Absorver"],
    spriteList: {
            up:    [46043, 46047, 46051],
            down:    [46045, 46049, 46053],
            left:    [46046, 46050, 46054],
            right:    [46044, 46048, 46052]
          }
  },

  Gloom: {hp: 170,
    maxHP: 170, maxMana: 80, aggressive: false,
    speed: 0.045, attackBase: 2, deffenseBase: 2,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Pó Venenoso"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Vileplume: {hp: 220,
    maxHP: 220, maxMana: 110, aggressive: true,
    speed: 0.045, attackBase: 4, deffenseBase: 3,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying"],
    strongElements: ["water", "rock"],
    skills: ["Pétala Solar"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Paras: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.04, attackBase: 1, deffenseBase: 2,
    elements: ["bug", "grass"],
    weakElements: ["fire", "flying", "ice"],
    strongElements: ["water", "grass"],
    skills: ["Absorver"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  
  Shiny_Paras: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.04, attackBase: 1, deffenseBase: 2,
    elements: ["bug", "grass"],
    weakElements: ["fire", "flying", "ice"],
    strongElements: ["water", "grass"],
    skills: ["Absorver"],
    spriteList: {
            up:    [46089, 46093, 46097],
            down:    [46091, 46095, 46099],
            left:    [46092, 46096, 46100],
            right:    [46090, 46094, 46098]
          }
  },

  Parasect: {hp: 200,
    maxHP: 200, maxMana: 70, aggressive: true,
    speed: 0.04, attackBase: 4, deffenseBase: 3,
    elements: ["bug", "grass"],
    weakElements: ["fire", "flying", "ice"],
    strongElements: ["water", "grass"],
    skills: ["Esporos"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Venonat: {hp: 140,
    maxHP: 140, maxMana: 50, aggressive: false,
    speed: 0.045, attackBase: 1, deffenseBase: 2,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying", "psychic"],
    strongElements: ["grass"],
    skills: ["Confusão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  
  Shiny_Venonat: {hp: 140,
    maxHP: 140, maxMana: 50, aggressive: false,
    speed: 0.045, attackBase: 1, deffenseBase: 2,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying", "psychic"],
    strongElements: ["grass"],
    skills: ["Confusão"],
    spriteList: {
            up:    [46137, 46141, 46145],
            down:    [46139, 46143, 46147],
            left:    [46140, 46144, 46148],
            right:    [46138, 46142, 46146]
          }
  },

  Venomoth: {hp: 180,
    maxHP: 180, maxMana: 90, aggressive: true,
    speed: 0.065, attackBase: 3, deffenseBase: 2,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying", "psychic"],
    strongElements: ["grass"],
    skills: ["Vento Prateado"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Shiny_Venomoth: {hp: 180,
    maxHP: 180, maxMana: 90, aggressive: true,
    speed: 0.065, attackBase: 3, deffenseBase: 2,
    elements: ["bug", "poison"],
    weakElements: ["fire", "flying", "psychic"],
    strongElements: ["grass"],
    skills: ["Vento Prateado"],
    spriteList: {
            up:    [46149, 46153, 46157],
            down:    [46151, 46155, 46159],
            left:    [46152, 46156, 46160],
            right:    [46150, 46154, 46158]
          }
  },

  Diglett: {hp: 100,
    maxHP: 100, maxMana: 30, aggressive: true,
    speed: 0.07, attackBase: 1, deffenseBase: 1,
    elements: ["ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["electric", "rock"],
    skills: ["Escavação"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Dugtrio: {hp: 180,
    maxHP: 180, maxMana: 50, aggressive: true,
    speed: 0.075, attackBase: 3, deffenseBase: 2,
    elements: ["ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["electric", "rock"],
    skills: ["Terremoto"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Meowth: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.07, attackBase: 1, deffenseBase: 1,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Arranhão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Persian: {hp: 200,
    maxHP: 200, maxMana: 70, aggressive: true,
    speed: 0.075, attackBase: 3, deffenseBase: 2,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Garra Furiosa"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Psyduck: {hp: 140,
    maxHP: 140, maxMana: 80, aggressive: false,
    speed: 0.05, attackBase: 1, deffenseBase: 1,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Confusão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Golduck: {hp: 220,
    maxHP: 220, maxMana: 120, aggressive: true,
    speed: 0.06, attackBase: 4, deffenseBase: 3,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Hidro Bomba"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Mankey: {hp: 130,
    maxHP: 130, maxMana: 40, aggressive: true,
    speed: 0.065, attackBase: 2, deffenseBase: 1,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["normal", "rock"],
    skills: ["Golpe Karate"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Primeape: {hp: 210,
    maxHP: 210, maxMana: 70, aggressive: true,
    speed: 0.07, attackBase: 4, deffenseBase: 2,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["normal", "rock"],
    skills: ["Fúria"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Growlithe: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: false,
    speed: 0.06, attackBase: 2, deffenseBase: 2,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Mordida"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  
  Shiny_Growlithe: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: false,
    speed: 0.06, attackBase: 2, deffenseBase: 2,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Mordida"],
    spriteList: {
            up:    [46157, 46161, 46165],
            down:    [46159, 46163, 46167],
            left:    [46160, 46164, 46168],
            right:    [46158, 46162, 46166]
          }
  },

  Arcanine: {hp: 260,
    maxHP: 260, maxMana: 120, aggressive: true,
    speed: 0.07, attackBase: 5, deffenseBase: 4,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Lança-Chamas"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Poliwag: {hp: 130,
    maxHP: 130, maxMana: 50, aggressive: false,
    speed: 0.055, attackBase: 1, deffenseBase: 1,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Bolhas"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Poliwhirl: {hp: 180,
    maxHP: 180, maxMana: 70, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire", "rock"],
    skills: ["Hipnose"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Poliwrath: {hp: 260,
    maxHP: 260, maxMana: 90, aggressive: true,
    speed: 0.055, attackBase: 5, deffenseBase: 4,
    elements: ["water", "fighting"],
    weakElements: ["electric", "grass", "psychic"],
    strongElements: ["fire", "rock", "normal"],
    skills: ["Soco Dinâmico"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Abra: {hp: 90,
    maxHP: 90, maxMana: 120, aggressive: false,
    speed: 0.06, attackBase: 1, deffenseBase: 1,
    elements: ["psychic"],
    weakElements: ["bug", "ghost", "dark"],
    strongElements: ["fighting", "poison"],
    skills: ["Teleporte"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Kadabra: {hp: 140,
    maxHP: 140, maxMana: 160, aggressive: true,
    speed: 0.065, attackBase: 3, deffenseBase: 2,
    elements: ["psychic"],
    weakElements: ["bug", "ghost", "dark"],
    strongElements: ["fighting", "poison"],
    skills: ["Confusão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Alakazam: {hp: 200,
    maxHP: 200, maxMana: 220, aggressive: true,
    speed: 0.07, attackBase: 5, deffenseBase: 3,
    elements: ["psychic"],
    weakElements: ["bug", "ghost", "dark"],
    strongElements: ["fighting", "poison"],
    skills: ["Psíquico"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Machop: {hp: 160,
    maxHP: 160, maxMana: 40, aggressive: true,
    speed: 0.05, attackBase: 2, deffenseBase: 2,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["normal", "rock"],
    skills: ["Soco"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Machoke: {hp: 220,
    maxHP: 220, maxMana: 60, aggressive: true,
    speed: 0.05, attackBase: 4, deffenseBase: 3,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["normal", "rock"],
    skills: ["Golpe Cruzado"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Machamp: {hp: 300,
    maxHP: 300, maxMana: 80, aggressive: true,
    speed: 0.05, attackBase: 6, deffenseBase: 4,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["normal", "rock"],
    skills: ["Soco Dinâmico"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },
    Bellsprout: {hp: 120,
    maxHP: 120, maxMana: 60, aggressive: true,
    speed: 0.05, attackBase: 1, deffenseBase: 1,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying", "psychic"],
    strongElements: ["water", "rock"],
    skills: ["Chicote de Vinha"],
    spriteList: {
            up: [
              [38555, 0, 0],
              [38559, 0, 0],
              [38563, 0, 0]],
            down:    [
              [38557, 0, 0], 
              [38561, 0, 0], 
              [38565, 0, 0]],
            left:    [
              [38558, 0, 0], 
              [38562, 0, 0], 
              [38566, 0, 0]],
            right:    [
              [38556, 0, 0], 
              [38560, 0, 0],
              [38564, 0, 0]] 
          }
  },

  Weepinbell: {hp: 180,
    maxHP: 180, maxMana: 80, aggressive: true,
    speed: 0.055, attackBase: 3, deffenseBase: 2,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying", "psychic"],
    strongElements: ["water", "rock"],
    skills: ["Folha Navalha"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Victreebel: {hp: 260,
    maxHP: 260, maxMana: 120, aggressive: true,
    speed: 0.055, attackBase: 5, deffenseBase: 3,
    elements: ["grass", "poison"],
    weakElements: ["fire", "ice", "flying", "psychic"],
    strongElements: ["water", "rock"],
    skills: ["Raio Solar"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Tentacool: {hp: 140,
    maxHP: 140, maxMana: 90, aggressive: false,
    speed: 0.055, attackBase: 1, deffenseBase: 2,
    elements: ["water", "poison"],
    weakElements: ["electric", "psychic", "ground"],
    strongElements: ["fire", "water"],
    skills: ["Ácido"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Shiny_Tentacool: {hp: 140,
    maxHP: 140, maxMana: 90, aggressive: false,
    speed: 0.055, attackBase: 1, deffenseBase: 2,
    elements: ["water", "poison"],
    weakElements: ["electric", "psychic", "ground"],
    strongElements: ["fire", "water"],
    skills: ["Ácido"],
    spriteList: {
            up:    [46282, 46286, 46290],
            down:    [46284, 46288, 46292],
            left:    [46285, 46289, 46293],
            right:    [46283, 46287, 46291]
          }
  },

  Tentacruel: {hp: 260,
    maxHP: 260, maxMana: 140, aggressive: true,
    speed: 0.06, attackBase: 4, deffenseBase: 4,
    elements: ["water", "poison"],
    weakElements: ["electric", "psychic", "ground"],
    strongElements: ["fire", "water"],
    skills: ["Hidro Bomba"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Geodude: {hp: 160,
    maxHP: 160, maxMana: 40, aggressive: true,
    speed: 0.045, attackBase: 2, deffenseBase: 3,
    elements: ["rock", "ground"],
    weakElements: ["water", "grass", "ice", "fighting"],
    strongElements: ["fire", "electric"],
    skills: ["Pedrada"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Graveler: {hp: 220,
    maxHP: 220, maxMana: 60, aggressive: true,
    speed: 0.045, attackBase: 4, deffenseBase: 4,
    elements: ["rock", "ground"],
    weakElements: ["water", "grass", "ice", "fighting"],
    strongElements: ["fire", "electric"],
    skills: ["Deslizamento de Rochas"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Golem: {hp: 320,
    maxHP: 320, maxMana: 80, aggressive: true,
    speed: 0.045, attackBase: 6, deffenseBase: 5,
    elements: ["rock", "ground"],
    weakElements: ["water", "grass", "ice", "fighting"],
    strongElements: ["fire", "electric"],
    skills: ["Terremoto"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Ponyta: {hp: 150,
    maxHP: 150, maxMana: 60, aggressive: false,
    speed: 0.065, attackBase: 2, deffenseBase: 2,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Chamas"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Rapidash: {hp: 260,
    maxHP: 260, maxMana: 90, aggressive: true,
    speed: 0.075, attackBase: 5, deffenseBase: 3,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Lança-Chamas"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Slowpoke: {hp: 200,
    maxHP: 200, maxMana: 80, aggressive: false,
    speed: 0.035, attackBase: 1, deffenseBase: 3,
    elements: ["water", "psychic"],
    weakElements: ["electric", "grass", "bug", "ghost"],
    strongElements: ["fire", "fighting"],
    skills: ["Confusão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Slowbro: {hp: 320,
    maxHP: 320, maxMana: 140, aggressive: true,
    speed: 0.035, attackBase: 4, deffenseBase: 5,
    elements: ["water", "psychic"],
    weakElements: ["electric", "grass", "bug", "ghost"],
    strongElements: ["fire", "fighting"],
    skills: ["Psíquico"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Magnemite: {hp: 130,
    maxHP: 130, maxMana: 80, aggressive: false,
    speed: 0.05, attackBase: 2, deffenseBase: 3,
    elements: ["electric", "steel"],
    weakElements: ["fire", "ground"],
    strongElements: ["water", "flying"],
    skills: ["Choque do Trovão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Magneton: {hp: 220,
    maxHP: 220, maxMana: 120, aggressive: true,
    speed: 0.05, attackBase: 4, deffenseBase: 4,
    elements: ["electric", "steel"],
    weakElements: ["fire", "ground"],
    strongElements: ["water", "flying"],
    skills: ["Raio"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Farfetchd: {hp: 150,
    maxHP: 150, maxMana: 50, aggressive: false,
    speed: 0.06, attackBase: 2, deffenseBase: 2,
    elements: ["normal", "flying"],
    weakElements: ["electric", "ice", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Corte"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Elite_Farfetchd: {hp: 150,
    maxHP: 150, maxMana: 50, aggressive: false,
    speed: 0.06, attackBase: 2, deffenseBase: 2,
    elements: ["normal", "flying"],
    weakElements: ["electric", "ice", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Corte"],
    spriteList: {
            up:    [46341, 46345, 46349],
            down:    [46343, 46347, 46351],
            left:    [46344, 46348, 46352],
            right:    [46342, 46346, 46350]
          }
  },

  Doduo: {hp: 150,
    maxHP: 150, maxMana: 40, aggressive: true,
    speed: 0.07, attackBase: 2, deffenseBase: 1,
    elements: ["normal", "flying"],
    weakElements: ["electric", "ice", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Ataque Duplo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Dodrio: {hp: 240,
    maxHP: 240, maxMana: 60, aggressive: true,
    speed: 0.075, attackBase: 5, deffenseBase: 2,
    elements: ["normal", "flying"],
    weakElements: ["electric", "ice", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Ataque Triplo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Seel: {hp: 180,
    maxHP: 180, maxMana: 60, aggressive: false,
    speed: 0.045, attackBase: 2, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Raio Aurora"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Dewgong: {hp: 300,
    maxHP: 300, maxMana: 120, aggressive: true,
    speed: 0.045, attackBase: 4, deffenseBase: 4,
    elements: ["water", "ice"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire", "ground"],
    skills: ["Nevasca"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Grimer: {hp: 200,
    maxHP: 200, maxMana: 40, aggressive: true,
    speed: 0.035, attackBase: 2, deffenseBase: 3,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass", "fairy"],
    skills: ["Lama Tóxica"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Shiny_Grimer: {hp: 200,
    maxHP: 200, maxMana: 40, aggressive: true,
    speed: 0.035, attackBase: 2, deffenseBase: 3,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass", "fairy"],
    skills: ["Lama Tóxica"],
    spriteList: {
            up:    [46353, 46357, 46361],
            down:    [46355, 46359, 46363],
            left:    [46356, 46360, 46364],
            right:    [46354, 46358, 46362]
          }
  },

  Muk: {hp: 320,
    maxHP: 320, maxMana: 60, aggressive: true,
    speed: 0.035, attackBase: 5, deffenseBase: 5,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass", "fairy"],
    skills: ["Ácido"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  }, 
  Shellder: {hp: 120,
    maxHP: 120, maxMana: 40, aggressive: false,
    speed: 0.03, attackBase: 2, deffenseBase: 4,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Rajada de Água"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Cloyster: {hp: 260,
    maxHP: 260, maxMana: 80, aggressive: true,
    speed: 0.03, attackBase: 4, deffenseBase: 6,
    elements: ["water", "ice"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire", "ground"],
    skills: ["Lança de Gelo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Gastly: {hp: 100,
    maxHP: 100, maxMana: 100, aggressive: true,
    speed: 0.06, attackBase: 3, deffenseBase: 1,
    elements: ["ghost", "poison"],
    weakElements: ["psychic", "ghost"],
    strongElements: ["grass", "fairy"],
    skills: ["Assombrar"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Haunter: {hp: 160,
    maxHP: 160, maxMana: 140, aggressive: true,
    speed: 0.065, attackBase: 4, deffenseBase: 2,
    elements: ["ghost", "poison"],
    weakElements: ["psychic", "ghost"],
    strongElements: ["grass", "fairy"],
    skills: ["Bola Sombria"],
    spriteList: {
            up:    [[46402, 46406, 46410], [46402, 46406, 46410], [46402, 46406, 46410]],
            down:    [[46404, 46408, 46412], [46404, 46408, 46412], [46404, 46408, 46412]],
            left:    [[46405, 46409, 46413], [46405, 46409, 46413], [46405, 46409, 46413]],
            right:    [[46403, 46407, 46411], [46403, 46407, 46411], [46403, 46407, 46411]] 
          }
  },

  Gengar: {hp: 260,
    maxHP: 260, maxMana: 200, aggressive: true,
    speed: 0.07, attackBase: 6, deffenseBase: 3,
    elements: ["ghost", "poison"],
    weakElements: ["psychic", "ghost"],
    strongElements: ["grass", "fairy"],
    skills: ["Pesadelo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Onix: {hp: 240,
    maxHP: 240, maxMana: 40, aggressive: false,
    speed: 0.05, attackBase: 3, deffenseBase: 6,
    elements: ["rock", "ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Investida"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Drowzee: {hp: 160,
    maxHP: 160, maxMana: 120, aggressive: false,
    speed: 0.045, attackBase: 2, deffenseBase: 2,
    elements: ["psychic"],
    weakElements: ["bug", "ghost"],
    strongElements: ["fighting"],
    skills: ["Hipnose"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Hypno: {hp: 280,
    maxHP: 280, maxMana: 200, aggressive: true,
    speed: 0.045, attackBase: 4, deffenseBase: 4,
    elements: ["psychic"],
    weakElements: ["bug", "ghost"],
    strongElements: ["fighting"],
    skills: ["Confusão Profunda"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  
  Shiny_Hypno: {hp: 280,
    maxHP: 280, maxMana: 200, aggressive: true,
    speed: 0.045, attackBase: 4, deffenseBase: 4,
    elements: ["psychic"],
    weakElements: ["bug", "ghost"],
    strongElements: ["fighting"],
    skills: ["Confusão Profunda"],
    spriteList: {
            up:    [46446, 46450, 46454],
            down:    [46448, 46452, 46456],
            left:    [46449, 46453, 46457],
            right:    [46447, 46451, 46455]
          }
  },

  Krabby: {hp: 140,
    maxHP: 140, maxMana: 40, aggressive: true,
    speed: 0.055, attackBase: 3, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Garra"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Shiny_Krabby: {hp: 140,
    maxHP: 140, maxMana: 40, aggressive: true,
    speed: 0.055, attackBase: 3, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Garra"],
    spriteList: {
            up:    [46459, 46463, 46467],
            down:    [46461, 46465, 46469],
            left:    [46458, 46462, 46466],
            right:    [46460, 46464, 46468]
          }
  },

  Kingler: {hp: 280,
    maxHP: 280, maxMana: 60, aggressive: true,
    speed: 0.055, attackBase: 6, deffenseBase: 4,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Martelo Caranguejo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Voltorb: {hp: 120,
    maxHP: 120, maxMana: 80, aggressive: true,
    speed: 0.065, attackBase: 2, deffenseBase: 2,
    elements: ["electric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],
    skills: ["Carga"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },
  Shiny_Voltorb: {hp: 120,
    maxHP: 120, maxMana: 80, aggressive: true,
    speed: 0.065, attackBase: 2, deffenseBase: 2,
    elements: ["electric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],
    skills: ["Carga"],
    spriteList: {
            up:    [46496, 46500, 46505],
            down:    [46498, 46502, 46506],
            left:    [46499, 46503, 46507],
            right:    [46497, 46501, 46505]
          }
  },

  Electrode: {hp: 200,
    maxHP: 200, maxMana: 120, aggressive: true,
    speed: 0.08, attackBase: 4, deffenseBase: 3,
    elements: ["electric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],
    skills: ["Explosão Elétrica"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },
  Shiny_Electrode: {hp: 200,
    maxHP: 200, maxMana: 120, aggressive: true,
    speed: 0.08, attackBase: 4, deffenseBase: 3,
    elements: ["electric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],
    skills: ["Explosão Elétrica"],
    spriteList: {
            up:    [46508, 46512, 46516],
            down:    [46510, 46514, 46518],
            left:    [46511, 46515, 46519],
            right:    [46509, 46513, 46517]
          }
  },

  Exeggcute: {hp: 180,
    maxHP: 180, maxMana: 100, aggressive: false,
    speed: 0.035, attackBase: 2, deffenseBase: 3,
    elements: ["grass", "psychic"],
    weakElements: ["fire", "bug", "ice"],
    strongElements: ["water", "ground"],
    skills: ["Semente Psíquica"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Exeggutor: {hp: 340,
    maxHP: 340, maxMana: 180, aggressive: true,
    speed: 0.035, attackBase: 5, deffenseBase: 4,
    elements: ["grass", "psychic"],
    weakElements: ["fire", "bug", "ice"],
    strongElements: ["water", "ground"],
    skills: ["Raio Solar"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Cubone: {hp: 160,
    maxHP: 160, maxMana: 40, aggressive: false,
    speed: 0.045, attackBase: 3, deffenseBase: 3,
    elements: ["ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Osso Bumerangue"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },
  
  Shiny_Cubone: {hp: 160,
    maxHP: 160, maxMana: 40, aggressive: false,
    speed: 0.045, attackBase: 3, deffenseBase: 3,
    elements: ["ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Osso Bumerangue"],
    spriteList: {
            up:    [46520, 46524, 46528],
            down:    [46522, 46526, 46530],
            left:    [46523, 46527, 46531],
            right:    [46521, 46525, 46529]
          }
  },

  Marowak: {hp: 300,
    maxHP: 300, maxMana: 60, aggressive: true,
    speed: 0.045, attackBase: 5, deffenseBase: 4,
    elements: ["ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Clava Óssea"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Shiny_Marowak: {hp: 300,
    maxHP: 300, maxMana: 60, aggressive: true,
    speed: 0.045, attackBase: 5, deffenseBase: 4,
    elements: ["ground"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Clava Óssea"],
    spriteList: {
            up:    [46532, 46536, 46540],
            down:    [46534, 46538, 46542],
            left:    [46535, 46539, 46543],
            right:    [46533, 46537, 46541]
          }
  },

  Hitmonlee: {hp: 260,
    maxHP: 260, maxMana: 60, aggressive: true,
    speed: 0.065, attackBase: 6, deffenseBase: 2,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["rock", "ice"],
    skills: ["Chute Giratório"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Hitmonchan: {hp: 260,
    maxHP: 260, maxMana: 60, aggressive: true,
    speed: 0.06, attackBase: 5, deffenseBase: 3,
    elements: ["fighting"],
    weakElements: ["psychic", "flying"],
    strongElements: ["rock", "ice"],
    skills: ["Soco Dinâmico"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Lickitung: {hp: 300,
    maxHP: 300, maxMana: 40, aggressive: false,
    speed: 0.035, attackBase: 3, deffenseBase: 3,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Lambida"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Koffing: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: true,
    speed: 0.035, attackBase: 2, deffenseBase: 3,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Gás Venenoso"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Weezing: {hp: 300,
    maxHP: 300, maxMana: 100, aggressive: true,
    speed: 0.035, attackBase: 4, deffenseBase: 5,
    elements: ["poison"],
    weakElements: ["ground", "psychic"],
    strongElements: ["grass"],
    skills: ["Explosão Tóxica"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Rhyhorn: {hp: 260,
    maxHP: 260, maxMana: 40, aggressive: true,
    speed: 0.035, attackBase: 4, deffenseBase: 5,
    elements: ["ground", "rock"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Investida"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Rhydon: {hp: 380,
    maxHP: 380, maxMana: 60, aggressive: true,
    speed: 0.035, attackBase: 6, deffenseBase: 6,
    elements: ["ground", "rock"],
    weakElements: ["water", "grass", "ice"],
    strongElements: ["fire", "electric"],
    skills: ["Terremoto"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Chansey: {hp: 500,
    maxHP: 500, maxMana: 200, aggressive: false,
    speed: 0.03, attackBase: 1, deffenseBase: 4,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Cura"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Tangela: {hp: 260,
    maxHP: 260, maxMana: 100, aggressive: false,
    speed: 0.035, attackBase: 3, deffenseBase: 5,
    elements: ["grass"],
    weakElements: ["fire", "ice", "flying"],
    strongElements: ["water", "ground"],
    skills: ["Chicote de Vinha"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Shiny_Tangela: {hp: 260,
    maxHP: 260, maxMana: 100, aggressive: false,
    speed: 0.035, attackBase: 3, deffenseBase: 5,
    elements: ["grass"],
    weakElements: ["fire", "ice", "flying"],
    strongElements: ["water", "ground"],
    skills: ["Chicote de Vinha"],
    spriteList: {
            up:    [46544, 46548, 46552],
            down:    [46546, 46550, 46554],
            left:    [46547, 46551, 46555],
            right:    [46545, 46549, 46553]
          }
  },

  Kangaskhan: {hp: 380,
    maxHP: 380, maxMana: 60, aggressive: true,
    speed: 0.05, attackBase: 5, deffenseBase: 4,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Soco Pesado"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Horsea: {hp: 140,
    maxHP: 140, maxMana: 80, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Jato d'Água"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },
  Shiny_Horsea: {hp: 140,
    maxHP: 140, maxMana: 80, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Jato d'Água"],
    spriteList: {
            up:    [46556, 46560, 46564],
            down:    [46558, 46562, 46566],
            left:    [46559, 46563, 46567],
            right:    [46557, 46561, 46565]
          }
  },

  Seadra: {hp: 260,
    maxHP: 260, maxMana: 140, aggressive: true,
    speed: 0.055, attackBase: 4, deffenseBase: 4,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Hidro Pulso"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Goldeen: {hp: 160,
    maxHP: 160, maxMana: 60, aggressive: false,
    speed: 0.055, attackBase: 2, deffenseBase: 2,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Chifre d'Água"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Seaking: {hp: 280,
    maxHP: 280, maxMana: 80, aggressive: true,
    speed: 0.055, attackBase: 5, deffenseBase: 3,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Megachifre"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Staryu: {hp: 300,
    maxHP: 300, maxMana: 200, aggressive: true,
    speed: 0.07, attackBase: 4, deffenseBase: 4,
    elements: ["water", "psychic"],
    weakElements: ["electric", "grass", "ghost"],
    strongElements: ["fire", "fighting"],
    skills: ["Psíquico"],
    spriteList: {
            up:    [[33648, 0, 0], [33652, 0, 0], [33656, 0, 0]],
            down:  [[33650, 0, 0], [33654, 0, 0], [33658, 0, 0]],
            left:  [[33651, 0, 0], [33655, 0, 0], [33659, 0, 0]],
            right: [[33649, 0, 0], [33653, 0, 0], [33657, 0, 0]] 
          }
  },

  Starmie: {hp: 300,
    maxHP: 300, maxMana: 200, aggressive: true,
    speed: 0.07, attackBase: 4, deffenseBase: 4,
    elements: ["water", "psychic"],
    weakElements: ["electric", "grass", "ghost"],
    strongElements: ["fire", "fighting"],
    skills: ["Psíquico"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  MrMime: {hp: 260,
    maxHP: 260, maxMana: 220, aggressive: false,
    speed: 0.05, attackBase: 3, deffenseBase: 4,
    elements: ["psychic", "fairy"],
    weakElements: ["ghost", "steel"],
    strongElements: ["fighting"],
    skills: ["Barreira"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Scyther: {hp: 280,
    maxHP: 280, maxMana: 80, aggressive: true,
    speed: 0.075, attackBase: 6, deffenseBase: 3,
    elements: ["bug", "flying"],
    weakElements: ["fire", "rock", "electric"],
    strongElements: ["grass", "psychic"],
    skills: ["Corte Duplo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Jynx: {hp: 260,
    maxHP: 260, maxMana: 200, aggressive: true,
    speed: 0.05, attackBase: 4, deffenseBase: 3,
    elements: ["ice", "psychic"],
    weakElements: ["fire", "steel", "ghost"],
    strongElements: ["dragon", "grass"],
    skills: ["Beijo Congelante"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Electabuzz: {hp: 280,
    maxHP: 280, maxMana: 120, aggressive: true,
    speed: 0.07, attackBase: 5, deffenseBase: 3,
    elements: ["electric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],
    skills: ["Soco Trovão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Magmar: {hp: 280,
    maxHP: 280, maxMana: 120, aggressive: true,
    speed: 0.065, attackBase: 5, deffenseBase: 3,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "ice"],
    skills: ["Explosão de Fogo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Pinsir: {hp: 300,
    maxHP: 300, maxMana: 60, aggressive: true,
    speed: 0.06, attackBase: 6, deffenseBase: 4,
    elements: ["bug"],
    weakElements: ["fire", "flying"],
    strongElements: ["grass", "psychic"],
    skills: ["Guilhotina"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Tauros: {hp: 320,
    maxHP: 320, maxMana: 40, aggressive: true,
    speed: 0.07, attackBase: 5, deffenseBase: 4,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Investida Brutal"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
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
        up:    [[39664, 0, 0], [39668, 0, 0], [39672, 0, 0]],
        down:  [[39666, 0, 0], [39670, 0, 0], [39674, 0, 0]],
        left:  [[39667, 0, 0], [39671, 0, 0], [39675, 0, 0]],
        right: [[39665, 0, 0], [39669, 0, 0], [39673, 0, 0]]
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
            up:    [[39700, 39704, 39708], [39700, 39704, 39708], [39700, 39704, 39708]],
            down:    [[39702, 39706, 39710], [39702, 39706, 39710], [39702, 39706, 39710]],
            left:    [[39703, 39707, 39711], [39703, 39707, 39711], [39703, 39707, 39711]],
            right:    [[39701, 39705, 39709], [39701, 39705, 39709], [39701, 39705, 39709]]
        }
    },


  Magikarp: {hp: 80,
    maxHP: 80, maxMana: 10, aggressive: false,
    speed: 0.02, attackBase: 0, deffenseBase: 0,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: [],
    skills: ["Splash"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Shiny_Magikarp: {hp: 80,
    maxHP: 80, maxMana: 10, aggressive: false,
    speed: 0.02, attackBase: 0, deffenseBase: 0,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: [],
    skills: ["Splash"],
    spriteList: {
            up:    [46720, 46724, 46728],
            down:    [46722, 46726, 46730],
            left:    [46723, 46727, 46731],
            right:    [46721, 46725, 46729]
          }
  },

  Gyarados: {hp: 420,
    maxHP: 420, maxMana: 120, aggressive: true,
    speed: 0.065, attackBase: 7, deffenseBase: 5,
    elements: ["water", "flying"],
    weakElements: ["electric"],
    strongElements: ["fire", "ground"],
    skills: ["Hidro Bomba"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Lapras: {hp: 420,
    maxHP: 420, maxMana: 200, aggressive: false,
    speed: 0.045, attackBase: 4, deffenseBase: 5,
    elements: ["water", "ice"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire", "ground"],
    skills: ["Canto Congelante"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Ditto: {hp: 200,
    maxHP: 200, maxMana: 200, aggressive: false,
    speed: 0.05, attackBase: 3, deffenseBase: 3,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Transformar"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Eevee: {hp: 180,
    maxHP: 180, maxMana: 80, aggressive: false,
    speed: 0.06, attackBase: 2, deffenseBase: 2,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Investida"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Vaporeon: {hp: 360,
    maxHP: 360, maxMana: 200, aggressive: false,
    speed: 0.045, attackBase: 4, deffenseBase: 4,
    elements: ["water"],
    weakElements: ["electric", "grass"],
    strongElements: ["fire"],
    skills: ["Hidro Pulso"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Jolteon: {hp: 280,
    maxHP: 280, maxMana: 160, aggressive: true,
    speed: 0.08, attackBase: 5, deffenseBase: 3,
    elements: ["electric"],
    weakElements: ["ground"],
    strongElements: ["water", "flying"],
    skills: ["Raio"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Flareon: {hp: 300,
    maxHP: 300, maxMana: 120, aggressive: true,
    speed: 0.055, attackBase: 6, deffenseBase: 3,
    elements: ["fire"],
    weakElements: ["water", "rock"],
    strongElements: ["grass", "ice"],
    skills: ["Lança-Chamas"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Porygon: {hp: 260,
    maxHP: 260, maxMana: 160, aggressive: false,
    speed: 0.035, attackBase: 3, deffenseBase: 4,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Conversão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Omanyte: {hp: 200,
    maxHP: 200, maxMana: 80, aggressive: false,
    speed: 0.03, attackBase: 2, deffenseBase: 4,
    elements: ["rock", "water"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire"],
    skills: ["Jato d'Água"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Omastar: {hp: 340,
    maxHP: 340, maxMana: 120, aggressive: true,
    speed: 0.03, attackBase: 5, deffenseBase: 6,
    elements: ["rock", "water"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire"],
    skills: ["Hidro Canhão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Kabuto: {hp: 200,
    maxHP: 200, maxMana: 60, aggressive: false,
    speed: 0.035, attackBase: 3, deffenseBase: 4,
    elements: ["rock", "water"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire"],
    skills: ["Corte"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Kabutops: {hp: 320,
    maxHP: 320, maxMana: 80, aggressive: true,
    speed: 0.06, attackBase: 6, deffenseBase: 4,
    elements: ["rock", "water"],
    weakElements: ["electric", "grass", "fighting"],
    strongElements: ["fire"],
    skills: ["Lâmina de Água"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Aerodactyl: {hp: 340,
    maxHP: 340, maxMana: 80, aggressive: true,
    speed: 0.085, attackBase: 6, deffenseBase: 3,
    elements: ["rock", "flying"],
    weakElements: ["electric", "water", "ice"],
    strongElements: ["fire", "bug"],
    skills: ["Ataque Aéreo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Snorlax: {hp: 520,
    maxHP: 520, maxMana: 60, aggressive: false,
    speed: 0.02, attackBase: 5, deffenseBase: 6,
    elements: ["normal"],
    weakElements: ["fighting"],
    strongElements: [],
    skills: ["Descanso"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Articuno: {hp: 420,
    maxHP: 420, maxMana: 260, aggressive: true,
    speed: 0.055, attackBase: 6, deffenseBase: 5,
    elements: ["ice", "flying"],
    weakElements: ["fire", "electric", "rock"],
    strongElements: ["grass", "dragon"],
    skills: ["Nevasca"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Zapdos: {hp: 420,
    maxHP: 420, maxMana: 260, aggressive: true,
    speed: 0.065, attackBase: 6, deffenseBase: 5,
    elements: ["electric", "flying"],
    weakElements: ["ice", "rock"],
    strongElements: ["water", "flying"],
    skills: ["Tempestade Elétrica"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Moltres: {hp: 420,
    maxHP: 420, maxMana: 260, aggressive: true,
    speed: 0.065, attackBase: 6, deffenseBase: 5,
    elements: ["fire", "flying"],
    weakElements: ["water", "electric", "rock"],
    strongElements: ["grass", "bug"],
    skills: ["Chamas Eternas"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Dratini: {hp: 180,
    maxHP: 180, maxMana: 100, aggressive: false,
    speed: 0.045, attackBase: 3, deffenseBase: 2,
    elements: ["dragon"],
    weakElements: ["ice", "dragon"],
    strongElements: ["fire", "water"],
    skills: ["Pulso do Dragão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Dragonair: {hp: 300,
    maxHP: 300, maxMana: 160, aggressive: false,
    speed: 0.05, attackBase: 4, deffenseBase: 4,
    elements: ["dragon"],
    weakElements: ["ice", "dragon"],
    strongElements: ["fire", "water"],
    skills: ["Onda Dragão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Dragonite: {hp: 420,
    maxHP: 420, maxMana: 200, aggressive: true,
    speed: 0.06, attackBase: 7, deffenseBase: 5,
    elements: ["dragon", "flying"],
    weakElements: ["ice", "dragon", "rock"],
    strongElements: ["fire", "water"],
    skills: ["Fúria do Dragão"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Mewtwo: {hp: 520,
    maxHP: 520, maxMana: 400, aggressive: true,
    speed: 0.07, attackBase: 8, deffenseBase: 6,
    elements: ["psychic"],
    weakElements: ["ghost", "bug"],
    strongElements: ["fighting"],
    skills: ["Psíquico Supremo"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  },

  Mew: {hp: 480,
    maxHP: 480, maxMana: 480, aggressive: false,
    speed: 0.075, attackBase: 6, deffenseBase: 6,
    elements: ["psychic"],
    weakElements: ["ghost", "bug"],
    strongElements: ["fighting"],
    skills: ["Origem Psíquica"],
    spriteList: {
            up: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]],
            down:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            left:    [
              [0, 0, 0], 
              [0, 0, 0], 
              [0, 0, 0]],
            right:    [
              [0, 0, 0], 
              [0, 0, 0],
              [0, 0, 0]] 
          }
  }
};
