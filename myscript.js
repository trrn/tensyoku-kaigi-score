function patch() {

  var user_total = 0, score_total = 0, scores_element = [];

  // graph
  jQuery(".graph").each(function(i) {
    var em_score, user_element = 0, score_element = 0;
    jQuery(this).find("tr").each(function() {
      var th = jQuery(this).find("th");
      if (th.length) {
        var em = th.find("em");
        if (em.length) { // total score for graph
          em_score = em;
        } else if (th.text().match(/^\d.0$/)) { // each score
          var score = th.text()|0;
          var user = (jQuery(this).find(".value, .last").text().match(/\((\d+)\)/)||[])[1]|0;
          if (user) {
            score_element += score * user;
            user_element += user;
          }
        }
      }
    });
    var score_honest = (score_element/user_element).toFixed(1);
    if (isNaN(score_honest)) score_honest = 0.0.toFixed(1);
    em_score && em_score.html(
      score_honest + ' <span class="tensyoku-score">(' + em_score.text() + ')</span>');

    score_total += score_element;
    user_total += user_element;
    scores_element[i] = score_honest;
  });

  // company report
  jQuery("#companyReport em").each(function(i) {
    jQuery(this).html(
      scores_element[i] + ' <span class="tensyoku-score">(' + jQuery(this).text() + ')</span>');
  });

  // total score
  var score_honest_total = (score_total/user_total).toFixed(1);
  if (isNaN(score_honest_total)) score_honest_total = 0.0.toFixed(1);
  jQuery(".point").each(function() {
    jQuery(this).find("em").each(function() {
      jQuery(this).html(
        score_honest_total + '<span class="tensyoku-score">(' + jQuery(this).text() + ')</span>');
    });
  });

  // star all
  jQuery("p[class^='star01_'], span[class^='star01_'], li.point").each(function() {
    var score = parseFloat((jQuery(this).find("em").text().match(/(\d.\d)/)||[])[0]).toFixed(1);
    jQuery(this).removeClass(function(index, css) {
      return (css.match(/star01_\S+/)||[])[0];
    }).addClass('star01_' + (((Math.round(score*2)/2)*10)||"00"));
  });
}

var style = document.createElement('style');
style.appendChild(document.createTextNode(
 '.tensyoku-score { font-weight: normal; font-size: 60%; color: #bbb }'));
document.body.appendChild(style);

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+patch+')();'));
document.body.appendChild(script);

