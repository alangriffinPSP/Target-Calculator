//TO DO:
//Add +/- percentage calculation
//"Do you know your sales deficit?" option. Hide inputs if unnecessary
//Add time options for differing opening hours


$(document).ready(function () {

    const calculator = {
        calculate() {

            $inputs = {
                target: $('#target').val(),
                actual: $('#actual').val(),
                weeks: $('#weeks').val()
            }

            const deficit = Math.round($inputs.target - $inputs.actual)
            const week = Math.round(deficit / $inputs.weeks)
            const day = Math.round(week / 7)
            const hour = Math.round(week / 57)
            //Based on 9:30-17:30 Mon-Fri & 10:00-16:00 Sunday. Add time options later?

            if (!$inputs.target || !$inputs.weeks || !$inputs.actual) {
                return;
            }

            if (deficit > 0) {
                $('#calculateButton').css('display', 'none');
                $('#results').css('display', 'inline-block');
                $('#deficit').text(` £${deficit} `);
                $('#weeksLeft').text(` ${$inputs.weeks} `);
                $('#targetWeek').text(`£${week} Per Week`);
                $('#targetDay').text(`£${day} Per Day`);
                $('#targetHour').text(`£${hour} Per Hour`);
                console.log($inputs, deficit, week, day, hour);
            } else {
                $('#congrats').css('display', 'inline-block')
                $('#calculateButton').css('display', 'none');
            }
        },

        calculateClickListener() {
            $('#calculateButton').click(this.calculate)
        }
    }
    calculator.calculateClickListener();


    const pageElements = {
        clearForm() {
            $('#inputs').trigger('reset');
            $('#calculateButton').css('display', 'inline');
            $('#congrats').css('display', 'none');
            $('#results').css('display', 'none');
        },

        resetClickListener() {
            $('#resetButton').click(this.$clearForm);
        }
    }
    pageElements.resetClickListener();

    pageElements.clearForm();
    //Document end
});