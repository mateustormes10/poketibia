import { SkillDatabase } from "./SkillDatabase.js";
import { PokemonDatabase } from "./listPokemon.js";

export default class PokemonSkillsUI {
    constructor(game) {
        this.game = game;
        this.visible = false;
        this.selectedPokemon = null;
        this.selectedSkillIndex = -1;
        
        this.createUI();
    }
    
    createUI() {
        // Container principal
        this.container = document.createElement('div');
        this.container.id = 'pokemon-skills-ui';
        this.container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 220px;
            max-height: 400px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #ffd700;
            border-radius: 8px;
            padding: 10px;
            color: white;
            font-family: Arial, sans-serif;
            display: none;
            z-index: 1000;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        `;
        
        // Header com nome do pokemon
        this.header = document.createElement('div');
        this.header.style.cssText = `
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            text-align: center;
            color: #ffd700;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        `;
        this.container.appendChild(this.header);
        
        // Lista de skills com scroll
        this.skillsList = document.createElement('div');
        this.skillsList.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 5px;
            max-height: 320px;
            overflow-y: auto;
            padding-right: 5px;
        `;
        
        // Estilo da scrollbar
        const style = document.createElement('style');
        style.textContent = `
            #pokemon-skills-ui div::-webkit-scrollbar {
                width: 6px;
            }
            #pokemon-skills-ui div::-webkit-scrollbar-track {
                background: rgba(0,0,0,0.3);
                border-radius: 3px;
            }
            #pokemon-skills-ui div::-webkit-scrollbar-thumb {
                background: #ffd700;
                border-radius: 3px;
            }
            #pokemon-skills-ui div::-webkit-scrollbar-thumb:hover {
                background: #ffed4e;
            }
        `;
        document.head.appendChild(style);
        
        this.container.appendChild(this.skillsList);
        
        // Botão fechar
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'X';
        closeBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: #ff0000;
            color: white;
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            cursor: pointer;
            font-weight: bold;
        `;
        closeBtn.addEventListener('click', () => this.hide());
        this.container.appendChild(closeBtn);
        
        document.body.appendChild(this.container);
    }
    
    show(pokemon) {
        if (!pokemon) return;
        
        this.selectedPokemon = pokemon;
        this.visible = true;
        this.container.style.display = 'block';
        
        // Atualiza header
        this.header.textContent = `${pokemon.name} - Skills`;
        
        // Limpa skills antigas
        this.skillsList.innerHTML = '';
        
        // Busca skills do pokemon no database
        const pokemonData = PokemonDatabase[pokemon.name];
        if (!pokemonData || !pokemonData.skills || pokemonData.skills.length === 0) {
            this.skillsList.innerHTML = '<div style="color: #888;">Nenhuma skill disponível</div>';
            return;
        }
        
        // Cria botões para cada skill
        pokemonData.skills.forEach((skillName, index) => {
            const skillData = SkillDatabase[skillName];
            if (!skillData) return;
            
            const skillBtn = document.createElement('button');
            skillBtn.style.cssText = `
                background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
                border: 1px solid #2c5f8d;
                border-radius: 5px;
                padding: 6px 8px;
                color: white;
                cursor: pointer;
                font-size: 11px;
                text-align: left;
                transition: all 0.15s;
                position: relative;
                overflow: hidden;
            `;
            
            skillBtn.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 2px; font-size: 12px;">${skillData.name}</div>
                <div style="font-size: 9px; opacity: 0.9;">
                    <span style="color: #ffeb3b;">⚡${skillData.manaCost}</span> | 
                    <span style="color: #ff5722;">💥${skillData.power}</span> | 
                    <span style="color: #8bc34a;">${skillData.element}</span>
                </div>
                <div style="font-size: 8px; opacity: 0.7; margin-top: 2px;">
                    ${skillData.type} | ${skillData.targetArea}
                </div>
            `;
            
            // Hover effects
            skillBtn.addEventListener('mouseenter', () => {
                skillBtn.style.background = 'linear-gradient(135deg, #5aa0f2 0%, #4070cd 100%)';
                skillBtn.style.transform = 'scale(1.03)';
                skillBtn.style.boxShadow = '0 2px 8px rgba(74, 144, 226, 0.5)';
            });
            
            skillBtn.addEventListener('mouseleave', () => {
                skillBtn.style.background = 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)';
                skillBtn.style.transform = 'scale(1)';
                skillBtn.style.boxShadow = 'none';
            });
            
            // Click handler
            skillBtn.addEventListener('click', () => {
                this.onSkillClick(skillName, skillData, index);
            });
            
            this.skillsList.appendChild(skillBtn);
        });
    }
    
    hide() {
        this.visible = false;
        this.container.style.display = 'none';
        this.selectedPokemon = null;
        this.selectedSkillIndex = -1;
    }
    
    toggle(pokemon) {
        if (this.visible && this.selectedPokemon === pokemon) {
            this.hide();
        } else {
            this.show(pokemon);
        }
    }
    
    onSkillClick(skillName, skillData, index) {
        this.selectedSkillIndex = index;
        
        // Destaca o botão selecionado
        const buttons = this.skillsList.querySelectorAll('button');
        buttons.forEach((btn, i) => {
            if (i === index) {
                btn.style.border = '2px solid #ffd700';
                btn.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.8)';
            } else {
                btn.style.border = '1px solid #2c5f8d';
                btn.style.boxShadow = 'none';
            }
        });
        
        // Notifica o game que uma skill foi selecionada
        if (this.game && typeof this.game.onPokemonSkillSelected === 'function') {
            this.game.onPokemonSkillSelected(this.selectedPokemon, skillName, skillData);
        }
    }
    
    isVisible() {
        return this.visible;
    }
}
