<!-- http://forum.501stdev.nl/viewtopic.php?f=7&t=4512&p=103420#p103420 -->
<style>
    .less-padding {
        padding: 30px 20px;
    }
    .fa-check {
        color: green;
    }
    .fa-times {
        color: red;
    }
  @media (max-width: 767px) {
        .no-padding-xs {
            padding: 0;
        }
        .google-maps-container img {
            width: 100%;
        }
        .extra-margin-top-xs {
            margin-top:20px;
        }
    }
</style>

<div id="entry-template" style="display: none;">
    <div class="jumbotron" style="padding: 20px;">
        <h1 style="margin-top:0; font-size: 40px;" class="display-3">{{name}}</h1>
        <p class="lead">{{description}}</p>
        <p><a target="_blank" class="btn btn-primary" href="http://iris.501st.nl/event/{IDENTIFIER}" role="button">View event in IRIS <i class="fa fa-external-link" aria-hidden="true"></i></a></p>
    </div>
    <div id="row" style="padding-bottom:10px;">
        <div class="col-sm-9 no-padding-xs" style="padding-left:0px !important;">
            <div class="jumbotron" style="padding: 20px 10px;">
                <div class="col-sm-4">
                    <h3>Date and Time</h3>
                    <strong>Start date:</strong> {{formatDate eventDates.0.date}}<br>
                    <strong>Begin time:</strong> {{startTime}}<br>
                    {{#each eventDates}}
                        {{#if @last}} <strong>End date:</strong> {{formatDate date}}<br>{{/if}}
                    {{/each}}
                    <strong>End Time:</strong> {{endTime}}<br>
                    <strong>Registration deadline:</strong> {{formatDate maxSignupDate}}<br>
                    <strong>Collection time:</strong> {{gatherTime}}<br>
                </div>
                <div class="col-sm-4" style="word-break: break-all;">
                    <h3 class="extra-margin-top-xs">Location</h3>
                    <strong>Address:</strong> {{street}} {{houseNumber}}<br>
                    <strong>City:</strong> {{city}}<br>
                    {{#if websiteUrl}}
                    <strong>Website:</strong><br>{{websiteUrl}}</a><br>
                    {{/if}}
                    {{#if facebookEvent}}
                    <strong>Facebook Event:</strong><br>{{facebookEvent}}</a><br>
                    {{/if}}
                    <strong>Event coordinator:</strong> {{eventCoordinator}}<br>
                </div>
                <div class="col-sm-4">
                    <h3 class="extra-margin-top-xs">Details</h3>
                    <strong>Public accessible event:</strong> {{#if publiclyAccessible}}<i class="fa fa-check"><span class="sr-only">yes</span></i>{{else}}<i class="fa fa-times"><span class="sr-only">no</span></i>{{/if}}<br>

                    <strong>Dressingroom:</strong> {{#if dressingroomAvailable}}<i class="fa fa-check"><span class="sr-only">yes</span></i>{{else}}<i class="fa fa-times"><span class="sr-only">no</span></i>{{/if}}<br>
                    <strong>Travel Restitution:</strong> {{#if travelRestitution}}<i class="fa fa-check"><span class="sr-only">yes</span></i>{{else}}<i class="fa fa-times"><span class="sr-only">no</span></i>{{/if}}<br>
                    <strong>Parking:</strong> {{#if parking}}<i class="fa fa-check"><span class="sr-only">yes</span></i>{{else}}<i class="fa fa-times"><span class="sr-only">no</span></i>{{/if}}<br>
                    <strong>Parking Restitution:</strong> {{#if parkingRestitution}}<i class="fa fa-check"><span class="sr-only">yes</span></i>{{else}}<i class="fa fa-times"><span class="sr-only">no</span></i>{{/if}}<br>
                    <strong>Food:</strong> {{#if food}}<i class="fa fa-check"><span class="sr-only">yes</span></i>{{else}}<i class="fa fa-times"><span class="sr-only">no</span></i>{{/if}}<br>
                    <strong>Drinks:</strong>
                    {{#if drinks}}<i class="fa fa-check"><span class="sr-only">yes</span></i>{{else}}<i class="fa fa-times"><span class="sr-only">no</span></i>{{/if}}
                    <h3 class="extra-margin-top-xs" style="margin-top: 15px;">Rules</h3>
                    <strong>Blasters Allowed:</strong>
                    {{#if blastersAllowed}}<i class="fa fa-check"><span class="sr-only">yes</span></i>{{else}}<i class="fa fa-times"><span class="sr-only">no</span></i>{{/if}}<br>
                    <strong>Guests allowed:</strong> {{#if canRegisterGuests}}<i class="fa fa-check"><span class="sr-only">yes</span></i>{{else}}<i class="fa fa-times"><span class="sr-only">no</span></i>{{/if}}
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="col-sm-3 no-padding-xs google-maps-container">
            {{{googlemapsimage street houseNumber postcode city}}}
        </div>
        <div class="clearfix"></div>
    </div>
    <div id="row" style="padding-bottom:10px; display: flex; flex-wrap: wrap;">
        {{#each eventDates}}
            <div class="col-xs-12 col-sm-6 no-padding-xs" style="padding-left:0px !important;">
                <div class="jumbotron" style="padding: 20px;">
                    <h3>{{formatDate date day="numeric" month="long" year="numeric"}}</h3>
                    <ul class="list-unstyled">
                        {{#each signedUpUsers}}
                            <li>
                              <div class="row">
                                <div class="col-xs-2 col-sm-1" style="padding-right: 0;">
                                  {{{avatarimage avatar}}}
                                </div>
                                <div class="col-xs-10 col-sm-11" style="line-height: 16px; padding-left: 5px; padding-top: 2px;">
                                  <strong>{{username}}</strong><br>
                                  {{costume}}
                                </div>
                              </div>
                            </li>
                        {{else}}
                            <p>No signups yet!</p>
                        {{/each}}
                    </ul>
                    <p>
                        <a target="_blank" class="btn btn-primary" href="http://iris.501st.nl/event/{IDENTIFIER}" role="button">View event in IRIS <i class="fa fa-external-link" aria-hidden="true"></i></a>
                    </p>
                    <div class="clearfix"></div>
                </div>
            </div>
        {{/each}}
    </div>
</div>

<script>
head.load('//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.min.js', 'https://cdn.jsdelivr.net/npm/handlebars-intl@1.1.2/dist/handlebars-intl.min.js', 'https://cdn.jsdelivr.net/npm/handlebars-intl@1.1.2/dist/locale-data/nl.js')
head.ready(function () {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://dutchgarrison.herokuapp.com/api/public/event?id={IDENTIFIER}')
    xhr.onload = function () {
        if (xhr.status === 200) {
            var intlData = {
                locales: 'nl-NL'
            }

            HandlebarsIntl.registerWith(Handlebars)

            Handlebars.registerHelper('googlemapsimage', function (street, houseNumber, postcode, city) {
                return '<img style="border-radius: 6px;" src="https://maps.googleapis.com/maps/api/staticmap?center=' + street + '+' + houseNumber + '+' + postcode + '+' + city + '&zoom=13&size=250x260&maptype=roadmap&markers=' + street + '+' + houseNumber + '+' + postcode + '+' + city + '&key=AIzaSyAYazeF-nhbaP3tkZTqsoipY7JOfXb7qAM" class="img-responsive" />'
            })

            Handlebars.registerHelper('avatarimage', function (avatar) {
                return new Handlebars.SafeString(
                    '<img style="width: 35px; margin-bottom: 5px;" src="' + avatar + '" class="img-responsive" />'
                )
            })

            el = document.getElementById('event-{IDENTIFIER}')
            var source = document.getElementById('entry-template').innerHTML
            var template = Handlebars.compile(source)
            var html = template(JSON.parse(xhr.responseText), {
                data: {intl: intlData}
            })

            el.innerHTML = html
        } else {
            alert('Request failed.  Returned status of ' + xhr.status)
        }
    }
    xhr.send()
})
</script>

<div id="event-{IDENTIFIER}">
    <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
    <span>Loading event</span>
</div>
