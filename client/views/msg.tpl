<div class="msg {{type}}{{#if self}} self{{/if}}{{#if highlight}} highlight{{/if}}" id="msg-{{id}}" data-time="{{time}}" data-from="{{from}}">
	<span class="time tooltipped tooltipped-e" aria-label="{{localetime time}}">
		{{tz time}}
	</span>
	<span class="from">
		{{#if from}}
		<span role="button" class="user {{colorClass from}}" data-name="{{from}}">{{mode}}{{from}}</span>
		{{/if}}
	</span>
		<span class="text">{{{parse text}}}
			{{#if url}}
			<br>
			<button id="toggle-{{id}}" class="toggle-button" aria-label="Toggle media">···</button>
			{{/if}}
	</span>

	</span>
</div>
