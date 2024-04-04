1. What could be changed in Companies page to make the code more maintainable?

I'd:
- split out a component for each company tile
- reuse the `useFetch` hook I wrote so it has error handling (or ideally use an existing solution)
- break the logo out into a shared component
- get rid of most/all of the inline styles, depending on how possible it was to move the logoColor elsewhere
- use the `CampaignType` and `CampaignStatus` from `campaign-ts`

I'd also consider not having separate object types: the way I've had to do `Pick<Company, ...>` as a type is not ideal, but that's a backend consideration.

2. Would you change the way styling is handled in the solution? If so, what would you change?

I like CSS-in-TS and would probably prefer that, since it lets you locate the relevant styles close to the point where they're used, and also helps avoid collision between styles.

I would also prefer some kind of design toolkit for consistency, as I found myself often needing things like "light" and "heavy" that would usually be utility classes or part of a `<Text/>` component.

3. Any other improvements or changes you would make?

Since this is a landing page, probably SSR, aggressive caching, and analytics of some kind.

I didn't see any experimentation, feature flags, or dynamic config. A/B testing the landing page would be a pretty common requirement and would be useful from the get-go; in my experience feature flags evolve from experimentation and from larger team sizes.

Accessibility and internationalisation are two big things that are missing, although those would be big projects.

I personally believe Redux and other state management libraries are overused and I wouldn't introduce them on a small project, but some shared state (for query invalidation, user info, etc.) can be beneficial.
