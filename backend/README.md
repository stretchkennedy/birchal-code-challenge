### ChillAlgo

Your task is to produce a report of our top rated investors.
Using the provided [transaction file](src/transaction_history.json) parse the data and weigh each individual transaction against
the weight table, adding the weights and total number of shares.
The data should then be returned to the console in a table sorted by weight descending (largest weight first).

Note: the weight table is in order of precedence and all rules are mutually exclusive (one weight value per transaction)

## Preparing your submission....

__Please don't use A.I__

- Don't change the method of data importing `const data = fs.readFileSync...`
- Prepare your solution in the `src` folder.
- Please don't import any 3rd party libraries.
- Answer the questions in the QUESTIONS.md file
- Bonus points for adding types, this is a typescript codebase after all
- Bonus points for unit test


### Sample Output

```sh
┌─────────┬───────────────┬────────────────┬────────┐
│ (index) │     name      │ totalShares    │ weight │
├─────────┼───────────────┼────────────────┼────────┤
│    0    │    'Terry'    │      1000      │   4    │
├─────────┼───────────────┼────────────────┼────────┤
│    1    │    'Jesse'    │      1000      │   3    │
├─────────┼───────────────┼────────────────┼────────┤
│    2    │    'Aisha'    │      1000      │   1    │
└─────────┴───────────────┴────────────────┴────────┘
```

### Weight Table

| RULE                                              | WEIGHT |
|---------------------------------------------------|--------|
| status = REFUND                                   | -1     |
| status = INCOMPLETE                               | 0      |
| status = PURCHASED & dateOfPurchase <= 6 months   | 1.5    |
| status = PURCHASED & numberOfShares > 1000        | 1.25   |
| status = PURCHASED                                | 1      |

