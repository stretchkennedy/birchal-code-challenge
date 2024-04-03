1) Would your solution change if you needed to parse 1 million plus records?

The answer is: it depends! Are we parsing the records in real-time or a batch system? How far does "1 million plus" extend: 10mn, 100bn, etc.? What does the company's existing infrastructure for data science look like?

The first barrier I'd expect to hit is loading the entirety of the file into memory. That's easily solved by streaming JSON reads from disk. There's also some low-hanging performance fruit like getting rid of the `.includes` in the type guard.

After that I'm unsure what would be next: either computation would start taking an unfeasibly long time, which is more likely in the real-time scenario, or the index of investors would no longer fit in memory on a single host. In either case I'd probably want to spread the computation over multiple hosts. At that point, it becomes a question of revisiting how the data is retrieved and stored when it's not in a big old JSON blob. What existing indexes can I leverage? Is the data sharded or indexed by investor already?

At the point where I'm investigating spreading the computation across multiple hosts, I'd start to get more involved in the specifications and requirements gathering too. Once things start to get expensive and complicated, stakeholders need a good understanding of the costs and benefits in order to weigh them. Maybe we'd eventually decide to weaken some constraints like real-time calculations and just cache the results, or maybe it really would be a business-critical feature.

(Also, as a side note, the code as implemented here is synchronous and will block the JS event loop. If it's part of a real-time system, that's perhaps not the optimal implementation. This could be fixed by yielding control every X records)

2) How would you deploy this service?

The first thing I'd assess is reusing whatever the company already has. If it's using ECS, I'd use ECS; if K8s, then K8s; likewise for bare metal, a custom orchestration framework, ElasticBeanstalk or Heroku, Lambda functions, etc. There's usually a good reason why deployments happen the way they do at a company, and I don't want to reinvent the wheel without context over more than one project.

There's also the question I had from Q1: is this real-time or a batch job? It looks like the kind of thing data scientists might be in charge of, in which case I might suggest rewriting it in SQL or Python and integrating it into their usual pipeline.

If I was doing this for my own side project, I'd probably just stick it in ECS and not think too much more.

3) How would you change this service to allow founders to have their own custom rulesets?

First thought is to let them define Math.js rules. Second is to use json-rules-engine and a stripped-down front end to make it a bit easier. Third is what implications custom rulesets will have for performance and usability: again, we come back to requirements-gathering, and need to assess the exact needs of the founder.

Assuming Math.js was acceptable, I'd do something like this:

```ts
export const getItemWeight = (
  now: Date,
  expr: string,
  { status, dateOfPurchase, numberOfShares }: TransactionHistoryItem,
): number => {
  const math = create(all);
  math.import({ status, dateOfPurchase, numberOfShares, now: now.getTime() });
  return math.evaluate(expr);
}
```

I'd also assume that the imported context would grow over time. There are some negatives here: the biggest one that I can see is that I compute and import the entire context for Math.js even when the particular constant you need isn't defined in the expression, which could be fixed with a bit of AST traversal if it turned out to be a problem.
