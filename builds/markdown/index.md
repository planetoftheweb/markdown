Flexible Layouts with Susy & Breakpoint

Creating layouts for responsive design can be challenging because of the math involved in calculating column widths and gutters, so it’s common for designers to turn to Frameworks and/or Sass to help simplify some of the process. A lot of frameworks are structured around a 12-column grid, but a flexible and responsive grid doesn’t always fit into this structure. In this article, I’m going to show you how to use a coupe of Sass extensions that can help you create truly flexible layout that transcend the 12-column grid.

In this article, I’m going to show you how to use a couple of Sass extensions to tame your layout problems.

The problem

Responsive design for layouts can be tough, because it involves calculating:

* Width of containers
* Rows
* Columns
* Gutters
* Different breakpoints.

Frameworks can help by creating presets for common breakpoints. Bootstrap 3, for example gives us a 12 column grid with four media query breakpoints (See Table 01).

The default Bootstrap 3 12-column Grid

Extra Small	Small	Medium	Large
Size	< 768px	≥ 768px	≥992px
Container	Auto	750px	970px
Size	.col-xs-	.col-sm-	.col-md-
Column width	Auto	~62px	~81px

Table 01. The bootstrap 3 Grid gives us a quick grid that will work with most layouts

Within your layouts, you use classes that cause your content to take up a certain amount of spots within the 12 column grid. Gutters in those columns will always take up 30px between the columns. This works brilliantly most of the time and is a huge timesaver over rolling your own responsive grid.

Figure 01. In a simple Bootstrap 3 layout with just three different breakpoints (two shown above), there are classes that don’t add semantic value and would be difficult to update.

But there are two problems. First, adding these classes to your markup can get a little verbose. Say for example that you want a layout that uses all of the columns on mobile devices, 6 of the 12 columns on small devices and 4 of the 12 columns on medium devices (see Figure 01). That markup might look something like this.

    <h2>Services</h2>
    <div class="row">
      <article class="service col-md-4 col-sm-6">
        <img class="icon" src="images/icon-exoticpets.svg" alt="Icon">
        <h3>Exotic Pets</h3>
        <p>We offer specialized care for reptiles, rodents, birds, and other exotic pets.</p>
      </article>

The second problem is that these classes add layout information to your HTML and would make your code difficult to update, especially on a large installation. But, a couple of classes isn’t too bad. As your layouts get more and more complex though (See figure 02), you might end up with some code that looks like this:

<div class="photo col-xs-6 col-xs-offset-3 col-sm-3 col-sm-offset-1 col-md-2 col-md-offset-2 col-lg-4 col-lg-offset-0">

Figure 02. With this layout, we are able to achieve more dramatic changes within different media query breakpoints, however it requires littering our markup with a lot of classes.

The larger issue is that you have little flexibility over your design. Why box yourself into a 12 column grid and what if you want to change the width of your gutters on a specific instance. Your framework should be taking care of the Math because that’s the hard part, but it shouldn’t be dictating the metrics of your layout…who made these frameworks the boss of you?

Susy

Figure 03. Susy is a series of mixins for Sass that takes care of handling the math for any layout grid.

Susy’s simple promise is to let you worry about the design and it will take care of the math. At it’s core it’s a set of sass mixins for calculating widths with a completely flexible grid system (See figure 03). To use it, you start off by importing the library into your project via an import command.

@import "susy";

That immediately gives you access to Susy’s grid framework which couldn’t be simpler to implement. In its most basic form, there’s just two mixins you’ll need to learn. First is the container mixin.

Containers

Containers help you control how the width of an element adjusts to different breakpoints in your grid. We use them in Bootstrap where the containers lock positions within the media query breakpoints (See table 01). With Susy, we can redefine the containers inside any element at any time without having to add any additional classes to our HMTL code.

Let’s say that I’m laying out a different website and this time (see figure 04). To create a container within an HTML element, I can add an include within my declaration like this:

Figure 04. The welcome section on this site uses Susy’s flexible containers set to a percentage of the width of the viewport.

#welcome {
  article {
    @include container(70%);
  } //article
}

This will make the item with a class of section work like a bootstrap container without having to add a .container class into our HTML. Because we don’t have to add the container class, our HTML can be a lot more semantic.

<div class="scene" id="welcome">
    <article class="content">
        <h1>Welcome to the Landon Hotel</h1>
        <p>The original Landon perseveres after 50 years in the heart of West London. The West End neighborhood has something for everyone&mdash;from theater to dining to historic sights. And the not-to-miss Rooftop Cafe is a great place for travelers and locals to engage over drinks, food, and good conversation.</p>
    </article>
</div>

In addition to making my HTML a lot more readable, it makes things easier to update as well. When we use classes like content and scene, it’s easy to redefine what those elements mean in terms of layout instead of having to think about how many classes we’ll need to add in order to make our content behave the way we want it to.

Working with Spans

In you create rows and columns by using spans. To create an element that takes up one of three columns you can write something like this.

#usefulinfo {
    section {
        @include span(1 of 3);
    }
}

What’s really great about this is that we never have to conform to a 12-column or use a grid with a specific number of columns and then adjust my elements accordingly. Any element in my layout can take up only the amount of columns that I need at that time (see figure 05).

Figure 05. Using a simple @include span statement, we can set up each of the containers in this section (Arrival Information, Services & Amenities and Accessibility) to fit into a custom, 3 column grid instead of forcing us into a 12 column default.

That really changes the way you think about columns. In Bootstrap I would have write that as .col-sm-4 since one third of 12 columns = 4. With Susy, I don’t have to think about how many units I want to span, I can simply specify the amount of columns I need. When you’re no longer thinking about the conversion to a specific number of columns, you can focus on what the layout should look like instead.

Setting up defaults

Of course in any layout system, it’s good to have defaults so that even in the example above we don’t have to specify the size of our gutters in every instance. We do that by modifying a variable called $susy at the top of our Sass like this:

$susy: (
  columns: 12,
  container: 60em,
  gutters: 1/4,
  gutter-position: inside
);

Susy has a ton of defaults that you can use to set up your default grid, but this basic setup will take care of putting together a standard Bootstrap-like default for your projects. Don’t forget everything in Susy is customizable, so you’re never married to any of these and can change them on a tag by tag basis.

Our settings above means the default grid will now have 12 columns when we use the @include command in the container mixin and that container will lock on at 60em width with gutters that are 1/4 of the size of the columns. If we wanted to fit our earlier sections to this grid, we could write the declaration like this:

#usefulinfo {
    section {
        @include span(4);
    }
}

That means that each section is taking up 4 of the 12 columns. However, I think it is more expressive to be able to say that an element takes up 1 of 3 columns instead of 4 of 12. If you need to offset columns to a certain position, you can use this notation.

@include span(8 at 4 of 12);

This lets an element take up 8 columns starting at the fourth position in a 12 column grid. So, when you’re creating a layout, you can focus on what your content needs to do instead of how the design fits into your existing grid.

Padding Columns

Another way to control the placement of your elements is by padding your columns (see figure 06). That adds a number of column spaces on each side of your columns. So, for example you can move a columns 7 units to the right and pad it one unit from the left like this:

@include pad(7,1);

That means that in addition to laying things out by thinking about positive spaces (how many columns an element should take), you can do the reverse and create designs based on spacing on each side of your content.

Figure 06. By using the pad include, you can lay out your content based on negative space. The Picadilly room information is placed on the 12 column grid seven units from the left and 1 unit from the right.

Managing Media Queries with Breakpoint

In order to make things truly responsive you need to be able to combine column setup and design with responsive breakpoints. To do this, we can use another set of mixins from a library called Breakpoint. Breakpoint makes it easier to handle media queries within your layouts. It does so by simplifying the language you’ll need to use to create media query breakpoints. Traditionally, you create media query breakpoints by using a rule like this:

@media (min-width: 34em) and (max-width: 62em) {
    .container {
        ...
    }
}
This creates a range of widths in which the declarations have an impact on your layout. With breakpoint, this gets a lot simpler by encapsulating the calls into a common sense mixin that’s much easier to write.

.container {
  @include breakpoint(34em 62em) {
        ...
  }
}
The call is different too because we can easily assign this inside an existing class. The great thing about breakpoint is that it makes assumptions based on common layout needs. Breakpoint rules are easy to learn too…there’s just three things you need to know.

Breakpoint rules

if you only include a single number in the breakpoint call, breakpoint will assume a min-width media query call.
If you include two numbers, then breakpoint will assume you want to specify a range between the two numbers (as in the example above).
If you include two values and one is a string, it will assume that you are sending the mixin a feature value pair so that if you want to you can still send in orientation or any other special media query rule.
Breakpoint has been folded into Susy since version 2.2.1. The Susy version works just like the breakpoint mixins, but you instead of calling breakpoint, you use susy-breakpoint. The same call would be made like this:

.container {
  @include susy-breakpoint(34em 62em) {
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}

Breakpoint & Susy

When you combine Breakpoint with Susy you get a responsive, flexible grid that can easily adjust to different media query declarations. Let’s take a look at the HTML for the information section on a website (see figure 07).

<div class="scene" id="hotelinfo">
  <article id="usefulinfo">
    <section id="arrivalinfo">
    </section>
    <section class="checklist" id="services">
    </section>
    <section class="checklist" id="accessibility">
    </section>
  </article>
  <article id="greenprogram"></article>
</div><!-- hotelinfo -->

Combining Susy and Breakpoint, we can create media queries that contain different grid layouts. In my layout, I have three different sections, but I want them to have different rules depending on the width of the viewport.

Figure 07. At two different breakpoints, our layout behaves differently, but this is fairly easy to express in Sass with Susy and Breakpoint

At these two different breakpoints, our layout behaves dramatically differently (see figure 07). In the larger breakpoint to the right, each section takes up three columns, however in the smaller breakpoint, the first column takes up 100% of the viewport, but the other two take up half of the viewport. This is what makes these mixins so powerful. The code for expressing these two layouts is concise and fairly straightforward.

section {
  @include susy-breakpoint(650px) {
    @include span(1 of 3);
  } //breakpoint
  @include susy-breakpoint(450px 650px) {
    &.checklist {
      @include span(1 of 2)
    } //checklist
  } //breakpoint
} //section

First, we set up defaults for any element within a section tag. If those elements reach a viewport that’s greater than 650px, they will occupy a 3 unit grid with each of those elements taking up a single unit.

If the layout is between 450px and 650px, then the elements with a class of .checklist (which are the service and accessibility sections) will fit into a completely new grid with only two columns within each of those elements taking up one of those units. The arrival information takes up 100% between these two breakpoints.

Notice that although we didn’t specify what happens below 450 pixels, it’s implied and taken care of by the defaults, each of the sections will take up 100% of the viewport.

Mastering Layouts through Mixins

What these two mixin frameworks give you goes beyond the code that you use to create the layouts. The ability to express your layouts without having to worry about this grid or that grid changes the way your brain works when designing projects.

Don’t get me wrong, I love frameworks. Bootstrap can help you create layouts with unprecedented speed with a battle tested grid that goes beyond layout to provide all kinds of CSS and JavaScript components to quickly handle common elements like tables, modals and forms.

What the system of design that I’ve outlined does is change the language you use to describe a layout into a natural, backwards compatible and easy to learn system that will change the way you think about designing websites.
