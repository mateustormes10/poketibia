export const PokemonDatabase = {
    Pikachu: {
        hp: 120,
        maxHP: 120,
        maxMana: 80,
        aggressive: false,
        speed: 0.07,
        attackBase: 1, 
        deffenseBase: 1,
        elements: ["eletric"],
        weakElements: ["stone"],
        strongElements: ["water"],
        skills: ["Choque do Trovão", "Cauda de Ferro"],

        spriteList: {
            up:    [39664, 39668, 39672],
            down:  [39666, 39670, 39674],
            left:  [39667, 39671, 39675],
            right: [39665, 39669, 39673]
        }
    },

    Charmander: {
        hp: 140,
        maxHP: 140,
        maxMana: 60,
        aggressive: true,
        speed: 0.06,
        attackBase: 1, 
        deffenseBase: 1,
        elements: ["fire"],
        weakElements: ["water"],
        strongElements: ["grass"],
        skills: ["Brasas", "Arranhão", "Fogaréu"],

        spriteList: {
            up:    [5101, 5102],
            down:  [5103, 5104],
            left:  [5105, 5106],
            right: [5107, 5108]
        }
    },

    Staryu: {
        hp: 140,
        maxHP: 140,
        maxMana: 60,
        aggressive: true,
        speed: 0.06,
        attackBase: 1, 
        deffenseBase: 1,
        elements: ["water"],
        weakElements: ["eletric"],
        strongElements: ["fire"],
        skills: ["Brasas", "Arranhão", "Fogaréu"],

        spriteList: {
            up:    [33648, 33652, 33656],
            down:  [33650, 33654, 33658],
            left:  [33651, 33655, 33659],
            right: [33649, 33653, 33657]
        }
    },

};
