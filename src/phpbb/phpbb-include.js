<div id="entry-template" style="display: none;">
    <div class="jumbotron">
        <h1 class="display-3">{{name}}</h1>
        <p class="lead">{{description}}</p>
        <p><a class="btn btn-primary" href="http://iris.501st.nl/" role="button">IRIS »</a></p>
    </div>
    <div id="row" style="padding-bottom:10px;">
        <div class="col-sm-8" style="padding-left:0px !important;">
            <div class="jumbotron" style="padding-right:30px; padding-left:30px;">
                <div class="col-sm-4">
                    <h3>Date and Time</h3>
                    <strong>Start date:</strong> {{eventDates.0.date}}<br>
                    <strong>Begin time:</strong> {{startTime.0.HH}}:{{startTime.0.mm}}<br>
                    {{#each eventDates}}
                        {{#if @last}} <strong>End date:</strong>{{date}}<br>{{/if}}
                    {{/each}}
                    <strong>End Time:</strong> {{endTime.0.HH}}:{{endTime.0.mm}}<br>
                    <strong>Registration deadline:</strong> {{maxSignupDate}}<br>
                    <strong>Collection time:</strong> {{gatherTime.0.HH}}:{{gatherTime.0.mm}}<br>
                </div>
                <div class="col-sm-4">
                    <h3>Location</h3>
                    <strong>Address:</strong> {{street}} {{houseNumber}}<br>
                    <strong>City:</strong> {{city}}<br>
                    <strong>Website:</strong> {{websiteUrl}}<br>
                    <strong>Event coordinator:</strong> {{eventCoordinator}}<br>
                </div>
                <div class="col-sm-4">
                    <h3>Details</h3>
                    <strong>Public:</strong> {{#if publiclyAccessible}}Ja{{else}}Nee{{/if}}<br>
                    <strong>Guests:</strong> {{#if canRegisterGuests}}Ja{{else}}Nee{{/if}}<br>
                    <strong>Dressingroom:</strong> {{#if dressingroomAvailable}}Ja{{else}}Nee{{/if}}<br>
                    <strong>Travel Restitution:</strong> {{#if travelRestitution}}Ja{{else}}Nee{{/if}}<br>
                    <strong>Parking:</strong> {{#if parking}}Ja{{else}}Nee{{/if}}<br>
                    <strong>Parking Restitution:</strong> {{#if parkingRestitution}}Ja{{else}}Nee{{/if}}<br>
                    <strong>Lunch:</strong> {{#if lunch}}Ja{{else}}Nee{{/if}}<br>
                    <strong>Drinks:</strong> {{#if drinks}}Ja{{else}}Nee{{/if}} <br>    
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="col-sm-4">
            {{{googlemapsimage street houseNumber postcode city}}}
        </div>
        <div class="clearfix"></div>
    </div>
    <div id="row" style="padding-bottom:10px;">
        {{#each eventDates}}
            <div class="col-sm-4" style="padding-left:0px !important;">
                <div class="jumbotron" style="padding-right:30px; padding-left:30px;">
                    <h3>{{date}}</h3>
                    <ul class="list-unstyled">
                        {{#each signedUpUsers}}
                            <li>
                                {{{avatarimage avatar}}}
                                {{username}}<br>
                                {{costume}}
                            </li>
                        {{/each}}
                    </ul>
                    <p><a class="btn btn-primary" href="#" role="button">Meld je aan »</a></p>
                    <div class="clearfix"></div>
                </div>
            </div>
        {{/each}}
    </div> 
</div>

<script>
head.load("//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.min.js");
head.ready(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://dutchgarrison.herokuapp.com/api/public/event?id={IDENTIFIER}');
    xhr.onload = function() {
        if (xhr.status === 200) {    
            Handlebars.registerHelper('googlemapsimage', function(street, houseNumber, postcode, city) {
              return new Handlebars.SafeString(
                '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + street + '+' + houseNumber + '+' + postcode + '+' + city +'&zoom=13&size=600x550&maptype=roadmap&markers=' + street + '+' + houseNumber + '+' + postcode + '+' + city + '&key=AIzaSyAYazeF-nhbaP3tkZTqsoipY7JOfXb7qAM" class="img-responsive" />'
              );
            });   

            Handlebars.registerHelper('avatarimage', function(avatar) {
              return new Handlebars.SafeString(
                '<img style="width: 35px; margin-bottom: 5px;" src="' + avatar + '" class="img-responsive" />'
              );
            });

            el = document.getElementById("event-{IDENTIFIER}");
            var source   = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);
            var html    = template(JSON.parse(xhr.responseText));
            console.log(xhr.responseText);
            el.innerHTML = html;
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
});
</script>

<div id="event-{IDENTIFIER}"></div>

