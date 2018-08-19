import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
import { Jobs } from '../api/jobs.js';

import './task.js';

import './body.html';

Template.body.helpers({

  tasks() {
    return Tasks.find({}, {sort: {createdAt: -1}});
  },

  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },

  jobs() {
      return Jobs.find({}, {sort: {createdAt: -1}});
  },

});

Template.body.events({
  'submit .new-task'(event) {
    event.preventDefault();
    Tasks.insert({
      text: event.target.text.value,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    event.target.text.value = '';
  },

  'submit .new-job' (event) {
    event.preventDefault();
    const newJobForm = event.target;

    Jobs.insert({
      companyName: newJobForm.companyName.value,
      jobTitle: newJobForm.jobTitle.value,
      skill1: newJobForm.skill1.value,
      skill2: newJobForm.skill2.value,
      skill3: newJobForm.skill3.value,
      skill4: newJobForm.skill4.value,
      minExperiences: newJobForm.minExperiences.value,
      maxExperiences: newJobForm.maxExperiences.value,
      jobLocation: newJobForm.jobLocation.value,
      createdAt: new Date(),

    });

    newJobForm.reset();
  },


});
