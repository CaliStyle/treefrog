## Utility Classes

Treefrog includes some helpful utility classes for visibility, text alignment, floats, and more.

* * *

### Visibility Classes

Our visibility classes work the same as they do in Foundation for Sites, allowing you to easily define when content is shown or hidden on various screen sizes. Add the class `show-for-[size]` to display an element on that size of screen and larger.

Add the class `show-for-[size]-only` to display an element _only_ at that screen size, not on any larger or smaller screens.

To hide elements at certain screen sizes, use the classes `hide-for-[size]` and `hide-for-[size]-only`

These classes are also available as mixins, if you'd rather not add these classes to your markup.

```
.componentOne { @include show-for(small); } .componentTwo { @include hide-for(medium); } .componentThree { @include show-for-only(large); } .componentFour { @include hide-for-only(small); }
```

* * *

### Text Alignment

Quickly align text with our text alignment classes.

These classes also come in responsive flavors, meaning you can shift text alignment on different screen sizes.

* * *

### Vertical Alignment

Using the magic of flexbox, we can vertically align a series of items in a row. We took these vertical alignment features and wrote a series of CSS classes to leverage them.

To start, create a container that will hold each item.

By default, each item will align to the top of the container. Add the classes `align-top`, `align-center`, or `align-bottom` to individual elements in the container to change their alignment.

These classes also come in responsive flavors, allowing you to change the alignment on different screen sizes. In the below example, the left box is top-aligned by default, and switches to center-aligned on medium-sized screens and larger.

* * *

### Floats and Clearing

Float an element to the left or right using our float classes.

If you have a container with only floated elements, add the clearfix class to ensure it has a proper height.

* * *

### Thumbnails

You can create thumbnails by adding a `thumbnail` class to an `<img>` element like so:


* * *


#### Basic Card
