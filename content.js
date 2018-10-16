//TODO - check for new posts in the case someone is using never ending reddit

(function() {
  
  // get each post
  var posts = document.querySelectorAll('.tagline');
  
  // parse each loaded post
  for (var i = 0; i < posts.length; i++){

    //skip any posts that have already had a cost added to them. This prevents multiple costs being
    //added if never ending reddit is used
    var previousCost = posts[i].querySelectorAll('span > .cost')[0];
    if (previousCost){
      continue;
    }

    // get gilds if any
    var silver = posts[i].querySelectorAll('a > .gilded-gid1-icon')[0];
    var gold = posts[i].querySelectorAll('a > .gilded-gid2-icon')[0];
    var platinum = posts[i].querySelectorAll('a > .gilded-gid3-icon')[0];

    // money calculations. These are based off of the base rate of coins and don't factor in
    // discounts for buying in bulk, discounts, sales, or coins acquired from premium. As of now:
    //     500 coins = $2
    //     1 silver = 100 coins = $0.40
    //     1 gold = 500 coins = $2
    //     1 platinum = 1800 coins = $7.20
    var money = 0;
    if (silver) {
      money += +silver.getAttribute('data-count') * .4;
    }

    if (gold) {
      money += +gold.getAttribute('data-count') * 2;
    }

    if (platinum) {
      money += +platinum.getAttribute('data-count') * 7.2;
    }

    // post had no gilds, move to the next post
    if (money == 0) {
      continue;
    }

    // make a new element with the total dollar amount to place at the end, then insert it
    var newEle = document.createElement("span");
    var content = document.createTextNode(' ' + formatMoney(money));
    newEle.setAttribute("id", "cost");
    newEle.appendChild(content);
    posts[i].insertAdjacentElement("beforeend", newEle);
  }
})();

function formatMoney(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}