---
layout: post
title: How to use exponents in PureScript
date: '2016-03-23 20:52:42'
tags:
- purescript
- math
- exponent
- tag
---

I'm doing the exercises for [PureScript By Example](https://leanpub.com/purescript) and I needed to raise a number to a power. (*exponentiate: to use an exponent*). This was not obvious to me. A couple of hints:

1. Remember that JavaScript uses [Math.pow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) — [^](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR) is a bitwise XOR operator that has nothing to do with exponentiation.

2. Use [Pursuit](https://pursuit.purescript.org) to search for [Pow](https://pursuit.purescript.org/search?q=pow). ... Wow, that's a lot of options. It really depends on the type you want to exponentiate. How about a simple [Number](https://github.com/purescript/purescript/wiki/Language-Guide#primitive-types)? It's actually the fourth one in the list. [Math.pow](https://pursuit.purescript.org/packages/purescript-math/0.2.0/docs/Math#v:pow)

Here's how to use it:

```haskell
import Math (pow)
pow 2.0 4.0
-> 16
```

