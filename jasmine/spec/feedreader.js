/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/*
 * READ: Reference to Matthew Cranford
 * included comments to try and demonstrate understanding
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            //does the variable exist?
            expect(allFeeds).toBeDefined();
            // we don't want an empty string, hence len=0
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url defined', function(){
            for(let feed of allFeeds){
              //each feed in allFeeds array have a url attribute
              expect(feed.url).toBeDefined();
              //shouldn't be an empty string
              expect(feed.url.length).not.toBe(0);
            }
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty (toBe(0)).
         */
         it('name defined', function(){
            for(let feed of allFeeds){
              //each feed in allFeeds array have a name attribute
              expect(feed.name).toBeDefined();
              //shouldn't be an empty string
              expect(feed.name.length).not.toBe(0);
            }
         });
    });

    /* "The menu" test */
    describe('The menu', function(){
      /* A test that ensures the menu element is
       * hidden by default.
       */
       it('is hidden', function(){
         const body = document.querySelector('body');
         //body has an array containing its classes
         //there should be a menu-hidden class
         expect(body.classList.contains('menu-hidden')).toBe(true);
       });
       /* A test that ensures the menu changes
        * visibility when the menu icon is clicked.
        * Checks if menu properly hides/displays on click
        */
        it('changes visibility', function(){
          const body = document.querySelector('body');
          //body has an array containing its classes
          //menu contains the class that helps define the hamburger menu icon
          const menu = document.querySelector('.menu-icon-link');
          menu.click(); //a remote way to click that menu icon
          expect(body.classList.contains('menu-hidden')).toBe(false);
          menu.click();
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

  /* "Initial Entries" test */
    describe('Initial Entries', function(){
      /* A test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
       beforeEach(function(done){
         //to work with loadFeed's async nature
         loadFeed(0, done);
       });
       it('completes work', function(){
         //retrieve the feed container
         const feed = document.querySelectorAll('.feed .entry');
         //feed should have children, at least 1
         expect(feed.length > 0).toBe(true);
       });
    });


  /* "New Feed Selection" test*/
    describe('New Feed Selection', function(){
      /* A test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */
       //get the feed
       const feed = document.querySelector('.feed');
       //to store the first feed's content (initial feed before change)
       const firstFeed = [];
       const secondFeed = [];
       beforeEach((done) => {
         //to work with loadFeed's async nature
         loadFeed(1, function(){
           // Setting the value of the firstFeed
           Array.from(feed.children).forEach(function(entry){
             //add that child's content to firstFeed
             firstFeed.push(entry.innerText);
           });
           loadFeed(2, function(){
             // Setting value of secondFeed
             Array.from(feed.children).forEach(function(entry){
               //add that child's content to firstFeed
               secondFeed.push(entry.innerText);
             });
             done();
           })
         });
         /*Array.from(feed.children).forEach(function(entry){
           //add that child's content to firstFeed
           firstFeed.push(entry.innerText);
         });
         //call the new feed: we should see a change
         loadFeed(1,done);*/
       });
       it('content changes', function(){
         Array.from(feed.children).forEach(function(entry,index){
           //we can afford to use a .toBe() because if this test failed,
           //the same exact first feed would still be in
           //console.log(entry.innerText, firstFeed[index], entry.innerText === firstFeed[index]);
           expect(entry.innerText === firstFeed[index]).toBe(false);
         });
       });
    });
}());
