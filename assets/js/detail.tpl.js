(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['details'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "         <li>"
    + container.escapeExpression(((helper = (helper = helpers.narrative || (depth0 != null ? depth0.narrative : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"narrative","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "<h3>Trip Summary</h3>\n    <ul>\n        <li>Estimated time: <strong>"
    + ((stack1 = (helpers.getMinutes || (depth0 && depth0.getMinutes) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.Details : depth0)) != null ? stack1.time : stack1),{"name":"getMinutes","hash":{},"data":data})) != null ? stack1 : "")
    + " minutes</strong></li>\n        <li>Distance:  <strong>"
    + ((stack1 = (helpers.roundNumber || (depth0 && depth0.roundNumber) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.Details : depth0)) != null ? stack1.distance : stack1),{"name":"roundNumber","hash":{},"data":data})) != null ? stack1 : "")
    + " miles</strong></li>\n        <li>Fuel used: <strong>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.Details : depth0)) != null ? stack1.fuelUsed : stack1), depth0))
    + " gallons</strong></li>\n    </ul>\n<h3>Directions</h3>\n    <ul>\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.Details : depth0)) != null ? stack1.maneuvers : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>";
},"useData":true});
})();