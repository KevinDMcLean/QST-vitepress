---
title: Replicating a Back Bet with a Portfolio of Lays
date: 2025-05-06
summary: In a perfectly efficient market (zero spread, zero over-round) one back bet can be reproduced exactly by laying every other runner.
tags: [arbitrage, market-microstructure, betting-maths]
---

**Take-away**  

On a friction-free exchange, backing a runner is identical to placing a bundle of lay bets on *all* the others.  
The lay stakes are set mechanically by the odds, so no edge is required to build the replication.

---

## 1. Set-up & notation

We consider an n-runner race under these assumptions:

- **No spread** — back and lay prices are identical  
- **No over-round** — implied probabilities sum to 1  
- Decimal odds = 1 / implied probability

<br>

| Symbol | Meaning |
|--------|---------|
| p_i    | *true* probability runner i wins |
| O_i    | quoted decimal odds on runner i |
| B      | stake of our original **back** bet on runner A |

---

## 2. Replicating a back bet with lays

We back runner **A** with stake £B at odds O_A.

### 2.1. P&L of the back bet

<br>

| Outcome         | P&L (£)            |
|-----------------|--------------------|
| A wins          | +B * (O_A - 1)     |
| Some other wins | -B                 |

<br>

Goal — reproduce the same profile *without* backing A; only by laying every other runner.

### 2.2. Closed-form lay stakes

<br>

For each runner j ≠ A, lay:

**L_j = B × (O_A / O_j)**

---

## 3. Tiny simulation sanity-check (Python)

<br>

```python
import numpy as np, pandas as pd

B = 100                           # £100 back stake
p = np.array([0.4, 0.3, 0.2, 0.1])
O = 1 / p
A = 0                             # index of backed runner

L = np.where(np.arange(len(p)) != A,
             B * O[A] / O, 0)

df = pd.DataFrame({
    'p_true': p,
    'odds':   O.round(2),
    'lay_stake': L.round(2)
})
print(df, '\n')

print('Sum of lays  :', L.sum())
print('Should equal :', B * (O[A] - 1))
