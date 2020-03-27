<p align="center">
  <a href="https://smallsticker.com">
    <img alt="Gatsby" src="https://backend.smallsticker.com/uploads/1ec9aa908bfd45a487dc151f5fbef4f2.jpeg" width="60" />
  </a>
</p>
<h1 align="center">
  small sticker <a href="https://smallsticker.com"> Store</a>
</h1>

This is the smallsticker store, where we make stickers, and other goodies available to programmer. 💪💜

<p align="center">
  <img alt="Gatsby socks with Dora for scale." src="https://backend.smallsticker.com/uploads/18f010589642475281c93e3cddb9491f.jpg" />
</p>

See it live: [smallsticker.com](https://smallsticker.com)

## Technical Overview

This store is built with data from:

- [Strapi](https://strapi.io)
- The [strapi-sdk-javascript](https://github.com/strapi/strapi-sdk-javascript)

We’re using [Gatsby V2](https://github.com/gatsbyjs/gatsby) and [Emotion](https://emotion.sh/) to get the data on screen.

The store is statically rendered using the gatsby-source-strapi plugin, and the order search dashboard is a dynamic app (e.g. client-only routes) protected by GitHub OAuth.


## Frequently Asked Questions

<details>
  <summary><strong>Why does it say I don't find my order when I enter GitHub login?</strong></summary>

&nbsp; <!-- leave this here to avoid smashing the text against the summary -->

Try opening the store in an incognito window and then proceed to check out. When checking out, make sure you're using the same GitHub account that's listed on your order email.

</details>

<details>
  <summary><strong>Why can't I get the store to authenticate?</strong></summary>

&nbsp; <!-- leave this here to avoid smashing the text against the summary -->

We _think_ this is a local storage issue, and it only seems to happen in Safari-based browsers. This includes all iOS browsers. Please see [this issue](https://github.com/gatsbyjs/store.gatsbyjs.org/issues/106) for details (or to help us fix it).

</details>

<details>
  <summary><strong>Why won't weixin pay work?</strong></summary>

&nbsp; <!-- leave this here to avoid smashing the text against the summary -->

We _think_ this is a Safari  cross-browser compatibility issue, we are fixing it, and it only seems to happen in Safari-based browsers. Please see [this issue](https://github.com/gatsbyjs/store.gatsbyjs.org/issues/106) for details (or to help us fix it).

</details>
