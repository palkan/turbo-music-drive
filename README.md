# Turbo Music Drive

This is a demo application exploring [Turbo][] future enhancements (expected in Turbo 8). **See it [live](https://turbo-music-drive.fly.dev)!**

|                        |                        |
| ---------------------- | ---------------------- |
| ![Home Page](public/screenshots/home-page.png) | ![Artist Page](public/screenshots/artist-page.png) |

Here is the list of features and the corresponding PRs (so you can see how it was implemented):

- [Morphing](https://github.com/palkan/turbo-music-drive/pull/1)
- [View transitions](https://github.com/palkan/turbo-music-drive/pull/2)

## Running locally

All you need is Ruby 3.2+.

Install dependencies:

```sh
bundle install
```

Run a web server along with the TailwindCSS CLI to build (and re-build) styles:

```sh
bin/dev
```

Go to [localhost:3000](http://localhost:3000) and enjoy!

[Turbo]: https://turbo.hotwired.dev
