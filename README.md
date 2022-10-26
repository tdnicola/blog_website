## Website 2.5?

I've lost count at this point.

I mean do you really know a guy if you don't see his code?

## Development setup

First, run the development server:

```bash
npm start
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Compose

`scripts/compose.js` can be used to easily generate a post with pre-filled front matter.

The first argument is the name of the post and the second optional argument is the extension (default to .mdx)

```
node ./scripts/compose.js "Rambling" .md
```

This will generate `./data/blog/rambling.md` with pre-filled front matter.

[Forked from this awesome Nextjs starter blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog)
