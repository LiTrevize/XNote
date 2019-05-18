$('.member-title').click(function(e) {
  console.log("Clicked");
  $(this).next().slideToggle();
  $(this).next().next().next().slideToggle();
})