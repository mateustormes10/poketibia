# Sistema de Combate Pokemon

## ✨ Funcionalidades Implementadas

### 1. **UI de Skills Melhorada**
- ✅ Tamanho reduzido (220px largura, 400px altura máxima)
- ✅ Scroll automático para até 12 skills
- ✅ Botão de fechar (X) no canto superior direito
- ✅ Informações compactas: Nome, Mana, Power, Elemento, Tipo, Área

### 2. **Spawn de Pokemon Selvagem**
- ✅ Tecla **P** para spawnar Pikachu selvagem próximo ao player (3-5 tiles)
- ✅ Backend cria Pokemon selvagem no servidor
- ✅ Todos os players veem o Pokemon selvagem (broadcast)
- ✅ Pokemon tem HP: 100/100, Level: 5

### 3. **Sistema de Combate**
- ✅ Pokemon do player pode atacar Pokemon selvagem
- ✅ Seleção de skill (tecla **K** abre UI)
- ✅ Clique na skill para selecionar (cursor vira crosshair)
- ✅ Clique no Pokemon selvagem para atacar
- ✅ Dano calculado baseado no `power` da skill
- ✅ HP do Pokemon selvagem atualiza em tempo real
- ✅ Barra de HP com cores:
  - 🟢 Verde (> 50% HP)
  - 🟠 Laranja (25-50% HP)
  - 🔴 Vermelho (< 25% HP)
- ✅ Texto HP numérico na barra (ex: "45/100")

### 4. **Sistema de Morte**
- ✅ Quando HP <= 0, Pokemon selvagem é removido do mapa
- ✅ Broadcast para todos os players
- ✅ Mensagem no console: "💀 Pikachu foi derrotado!"

## 🎮 Como Usar

### Passo 1: Soltar seu Pokemon
1. Clique nos slots de Pokemon na UI (lado direito)
2. Seu Pokemon aparece na frente do player
3. UI de skills abre automaticamente

### Passo 2: Spawnar Pokemon Selvagem
1. Pressione **P** para spawnar Pikachu selvagem
2. Pokemon aparece próximo ao player (3-5 tiles aleatórios)

### Passo 3: Abrir Skills
1. Pressione **K** para abrir/fechar UI de skills
2. Ou clique no X para fechar

### Passo 4: Atacar
1. Clique em uma skill na UI
2. Cursor vira crosshair (mira)
3. Clique no Pokemon selvagem no mapa
4. Animação da skill aparece
5. Dano é calculado e aplicado
6. HP do Pokemon selvagem atualiza

### Passo 5: Derrotar
1. Continue atacando até HP = 0
2. Pokemon selvagem some do mapa
3. Mensagem de vitória no console

## 🔧 Atalhos de Teclado

| Tecla | Função |
|-------|--------|
| **K** | Abrir/Fechar UI de Skills |
| **P** | Spawnar Pokemon Selvagem (teste) |
| **ESC** | Fechar menus |
| **Setas** | Mover player |

## 📡 Comunicação Backend

### Actions Implementadas

#### `spawnWildPokemon`
```javascript
{
  action: "spawnWildPokemon",
  playerId: "123"
}
```
Resposta: `spawnBroadcast` com Pokemon selvagem

#### `attackPokemon`
```javascript
{
  action: "attackPokemon",
  playerId: "123",
  payload: {
    targetId: "wild_123_456",
    damage: 55,
    skillName: "Choque do Trovão"
  }
}
```
Resposta: `pokemonDamaged` ou `pokemonDeath`

#### `pokemonDamaged` (Broadcast)
```javascript
{
  action: "pokemonDamaged",
  targetId: "wild_123_456",
  damage: 55,
  currentHp: 45,
  maxHp: 100,
  skillName: "Choque do Trovão"
}
```

#### `pokemonDeath` (Broadcast)
```javascript
{
  action: "pokemonDeath",
  targetId: "wild_123_456"
}
```

## 🎯 Próximas Melhorias Sugeridas

- [ ] Sistema de XP ao derrotar Pokemon
- [ ] Drops de itens
- [ ] Mais tipos de Pokemon selvagens
- [ ] Sistema de captura (Pokebola)
- [ ] Custo de mana para skills
- [ ] Cooldown de skills
- [ ] Skills com área (3x3, 5x5)
- [ ] Animações de morte
- [ ] Som de batalha
- [ ] Pokemon selvagem contra-ataca
- [ ] Sistema de level e evolução

## 📝 Notas Técnicas

- Pokemon selvagem não tem `ownerId` (null)
- Pokemon do player tem `ownerId` igual ao ID do player
- Dano é calculado no cliente e validado no servidor
- HP é gerenciado pelo servidor (fonte da verdade)
- Todos os clientes recebem broadcasts de dano/morte
- Skills usam `spriteSkillList` do SkillDatabase para animação
