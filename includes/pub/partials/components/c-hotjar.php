<?php

/**
 * Hotjar tracking analytics
 */
?>
<h3>Hotjar tracking</h3>

<div class="ccfw-radios ccfw-radios--inline">
	<div class="ccfw-radios__item">
		<input class="ccfw-radios__input" id="ga-yes" name="gAnalytics" type="radio" value="" checked>
		<label class="ccfw-label ccfw-radios__label" for="ga-yes">
			<?php _e( 'Yes', 'cookie-compliance-for-wordpress'); ?>
		</label>
	</div>
	<div class="ccfw-radios__item">
		<input class="ccfw-radios__input" id="ga-no" name="gAnalytics" type="radio" value="">
		<label class="ccfw-label ccfw-radios__label" for="ga-no">
			<?php _e( 'No', 'cookie-compliance-for-wordpress'); ?>
		</label>
	</div>
</div>