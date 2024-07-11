/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Profile.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: emajuri <emajuri@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/06/20 09:22:19 by jmykkane          #+#    #+#             */
/*   Updated: 2024/07/09 16:09:06 by emajuri          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import AbstractView from './AbstractView.js'; // Adjust the import as necessary

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Profile');
        this.auth = true;
        this.params = params;
        this.listeners = true;
        this.profileURL = 'http://localhost:8000/account';

        this.UsernameHandler = this.UsernameHandler.bind(this);
        this.PasswordHandler = this.PasswordHandler.bind(this);
    }

    async UsernameHandler(event) {
        event.preventDefault();
        console.log('Changing username');
    }

    async PasswordHandler(event) {
        event.preventDefault();
        console.log('Changing password');
    }

    AddListeners() {
        const usernameForm = document.getElementById('change-username-form');
        const passwordForm = document.getElementById('change-password-form');

        if (usernameForm && passwordForm) {
            usernameForm.addEventListener('submit', this.UsernameHandler);
            passwordForm.addEventListener('submit', this.PasswordHandler);
        } else {
            console.log('505 - Internal server error - could not find submit buttons');
            this.Redirect('/500');
        }
    }

    RemoveListeners() {
        const usernameForm = document.getElementById('change-username-form');
        const passwordForm = document.getElementById('change-password-form');

        if (usernameForm && passwordForm) {
            usernameForm.removeEventListener('submit', this.UsernameHandler);
            passwordForm.removeEventListener('submit', this.PasswordHandler);
        } else {
            console.log('505 - Internal server error - could not find submit buttons');
            this.Redirect('/500');
        }
    }

    async getHtml() {
        return `
            <div class="settings-div">
                <div class="settings-card">

                        <div class="change-form">
                            <h2>Change Username</h2>
                            <form id="change-username-form" action="" method="">

                            <label class="font-text" for="username">username:</label>
                            <input class="font-text login-input" type="text" id="username" name="username" required><br><br>

                            <button class="font-sub change-username-submit-button" id="changeUsernameSubmitButton" type="submit">
                                <div class="text-holder">
                                <span id="change-username-button-text">Change</span>
                                </div>
                            </button>

                            <div id="notification-div"></div>

                            </form>
                        </div>

                        <div class="change-form">
                            <h2>Change Password</h2>
                            <form id="change-password-form" action="" method="">

                            <label class="font-text" for="password">password:</label>
                            <input class="font-text login-input" type="text" id="password" name="password" required><br><br>

                            <button class="font-sub change-password-submit-button" id="changepasswordSubmitButton" type="submit">
                                <div class="text-holder">
                                <span id="change-password-button-text">Change</span>
                                </div>
                            </button>

                            <div id="notification-div"></div>

                            </form>
                        </div>
                </div>
            </div>
        `;
    }
}