define(['jquery', 'lodash', 'knockout', 'case.structure','utils','lightbox',
        // templates
        'ko.tmpl8!../static/html/case/case.menu.ko.html!case.menu',
        'ko.tmpl8!../static/html/case/steps/step1.ko.html!step1',
        'ko.tmpl8!../static/html/case/steps/step2.ko.html!step2',
        'ko.tmpl8!../static/html/case/steps/step3.ko.html!step3',
        'ko.tmpl8!../static/html/case/steps/step4.ko.html!step4',
        'ko.tmpl8!../static/html/case/steps/step5.ko.html!step5',
        'ko.tmpl8!../static/html/case/steps/step6.ko.html!step6',
        'ko.tmpl8!../static/html/case/steps/step7.ko.html!step7',
        // add-ons
        'ko.router', 'ko.postbox', 'ko.dict'
    ],
    function($, _, ko, CaseStruct, utils) {
        return function(app) {
            var self = this;
            self.config  = ko.observableDictionary(CaseStruct);
            self.id      = utils.guid();
            self.viewing = {
                group : ko.observable(),
                step : ko.observable(1)
            };
            // self.router = router;
            self.steps  = self.config.computed('steps', undefined, undefined, function(steps) {
                return _.map(steps, function(s, idx) {
                    s.index = ko.computed(function(){
                        return idx + 1;
                    });

                    s.active = ko.computed(function(){
                        // console.log('step.active',self.viewing.step(),s.index());
                        return parseInt(self.viewing.step()) === parseInt(s.index());
                    });
                    s.siblings = ko.computed(function(){
                        return _.filter(self.config.get('steps')(),function(step){
                            return step.group === s.group;
                        }).length;
                    });
                    // s.css = ko.computed(function(){
                    //     var classes = 'columns' + (s.active()?' active':'');
                    //     // console.log('css!',classes);
                    //     return classes;
                    // });

                    s.addCF = function() {
                        //contributing_factors : ko.observableArray[];
                        self.steps()[2].contributing_factors = [];
                        var fields = $('.sibling-cloner');
                        for (i=0; i<fields.length; i++) {
                            if (fields[i].value.length > 0) {
                                self.steps()[2].contributing_factors.push(fields[i].value);
                            }
                        }
                        console.log(self.steps()[2].contributing_factors);
                        return true;
                        //return self.steps()[2].contributing_factors
                    };

                    // view a particular step
                    s.view = function(step,evt){
                        console.log('view!',arguments);
                        app.router.go('step',self.id,step.index());
                    };

                    // view a nearby step
                    s.go = {
                        next : function(step,evt){
                            app.router.go('step',self.id, step.index() + 1);
                        },
                        prev : function(step,evt){
                            app.router.go('step',self.id, step.index() - 1);
                        }
                    };
                    return s;
                });

            });
            self.groups = self.config.computed('groups', undefined, undefined, function(groups) {
                return _.map(groups,function(g){
                    g.steps = ko.computed(function(){
                        return _.compact(_.map(self.steps(), function(s) {
                            return (s.group === g.id)?s:null;
                        }));
                    });
                    g.active = ko.computed(function(){
                        return _.any(g.steps(),function(s){
                            return s.active();
                        });
                    });
                    return g;
                });
            });
            self.menu = {
                template : 'case.menu',
                data : self.steps()
            };

        };
    });

function hideUnchecked() {
    var active = $(event.currentTarget).siblings($('.vis-toggle')).addClass('active');
    var inputs = active.find('input');
    for (i=0; i<inputs.length; i++) {
        $(inputs[i]).attr('disabled', true);
        if ($(inputs[i]).is(":checked")) {
        } else {
            $(inputs[i]).parent().css('display', 'none');
        }
    };
};

// the next three functions should b combined with a parameter for target of classToggle
function toggleView(bool) {
    $(event.currentTarget).toggleClass("collapsed");
    if (bool != false) {
        console.log(bool);
        $(event.currentTarget).parent($('fieldset')).toggleClass('compress');
    }
};

function toggleChildThreads() {
    var target = $(event.currentTarget).closest($('[class*=why]'));
    $(target).toggleClass("collapsed");
};

function treeBranch() {
    // if (!($('#hooks')[0])) {
    //     console.log($('#hooks'));
    //     $('<style type="text/css" id="hooks"></style>').appendTo('head');
    // }
    // determine nth-child for row of armCSS declaration //
    var papaRow = $(event.currentTarget).parents('.root-wrap')[0];
    console.log(papaRow);
    var rowArray = $(papaRow).siblings().addBack();
    var rowNumber = ($(rowArray).index(papaRow)) + 1;

    // get array of all threads under this contributing factor //
    var threads = $(event.currentTarget).parents('.thread').siblings('.thread').addBack();
    // initialize variable that will contain css format (outside of loop so
    // the variable isn't zeroed each iteration)                         //
    var armCSS = "";
    // loop only if there is more than one thread in a fieldset //
    if (threads.length > 1) {
        // for each thread beyond the first, find the distance from the previous thread //
        threads.each(function(index) {
            if ([index] > 0) {
                var armLength =($(threads[index]).offset().top - $(threads[--index]).offset().top - 210);
                if (armLength > 50) {
                    armCSS += " .row:nth-child(" + rowNumber + ") .thread:nth-of-type(" + parseInt((index)+2) + ") > div:first-child:before{height:" + armLength + "px;margin-top:-" + armLength + "px;}";
                }
                $('#hooks')[0].innerHTML = armCSS;
            }
        })
    }
}

function showAll() {
    $(event.currentTarget).siblings($('.vis-toggle')).removeClass('active').siblings().show(300);
    $('input').attr('disabled', false);
};

function displaySelection(output) {
    var target = event.currentTarget.selectedOptions;
    var selection = [];
    $('.' + output + '-label').removeClass('hide');
    $('.' + output + '-list').html('');
    for (i=0; i<target.length; i++) {
        $('.' + output + '-list').append(target[i].label + '<br>');
        selection.push(target[i].label);
    }
};

function cloneField() {
    var target = $(event.currentTarget).prev();
    target.after(target.clone());
};

function trackCF() {
    var target = $('.sibling-cloner');
    $('.draft-drawer').removeClass('hide');
    $('.draft-list').html('');
    for (i=0; i<target.length; i++) {
        if (target[i].value.length > 0) {
            $('.draft-list').append(target[i].value + '<br>');
        }
    }
}

function trackRC() {
    var target = $('input:checked').closest($('[class*=why]')).find('.rc-text');
    var count = $('input:checked').length;
    $('.draft-drawer').removeClass('hide');
    $('.draft-list').html('');
    for (i=0; i<target.length; i++) {
        if (target[i].value.length > 0) {
            $('.draft-list').append(target[i].value + '<br>');
        }
    }
}

function addNote() {
    $('.note-drawer').removeClass('hide');
    console.log(self.caseNotes);
    // $('.note-text')[0].value += $('#notes')[0].value;
    // $('#notes')[0].value = "";
    //console.log($('.note-text')[0].value);
}

function addRemove(className) {
    var origin = $(event.currentTarget).context.className;
    var target = $(event.currentTarget).closest($(className));
    if (origin == 'fi-plus') {
        target.after(target.clone());
    } else if (target.siblings()[0]) {
        target.remove();
    }
}
function registerGap() {
    var target = $(event.currentTarget);
    var row = target.parents('tr');
    if (target[0].tagName == 'INPUT') {
        if (target[0].checked) {
            target.parent().addClass('checked');
            row.addClass('filled');
        } else {
            target.parent().removeClass('checked');
            row.removeClass('filled').find('select').each(function(index) {
                if ($(this)[0].value) {
                    target.parents('tr').addClass('filled');
                }
            })
        }
        return;
    }
    if (target[0].tagName == 'SELECT', 'I') {
        row.removeClass('filled').find('select').each(function(index) {
            if ($(this)[0].value != "") {
                row.addClass('filled');
            }
        })
    }
}

function move(direction) {
    var target = $(event.currentTarget).closest($('.row'));
    if (direction == 'down') {
        target.insertAfter(target.next());
    }
    if (direction == 'up') {
        target.insertBefore(target.prev());
    }
}
function newCause() {
    var target = $(event.currentTarget).closest($('[class*=why]'));
    var clone = $(target).clone()[0];
    var classArray = target[0].className.split(' ');
    var newClass = classArray[0].replace(classArray[0].slice(-1), parseInt(classArray[0].slice(-1)) + 1);
    classArray[0] = newClass;
    clone.className = classArray.join(' ');
    $(target).after(clone);
    treeBranch();
};

function newThread() {
    var target = $(event.currentTarget).closest($('[class*=why]'));
    var thread = target.parent();
    var clone = $(target).clone()[0];
    $(thread).after(clone);
    $(clone).wrap('<div class="thread row"></div>');
    treeBranch();
}

function deleteCause() {
    $(event.currentTarget).parents('[class*=why]').remove();
}

function modal() {
    $('[class*=reveal').toggleClass('show');
}
