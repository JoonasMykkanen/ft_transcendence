/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   notification.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jmykkane <jmykkane@student.hive.fi>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/06/27 12:45:45 by jmykkane          #+#    #+#             */
/*   Updated: 2024/07/24 06:24:07 by jmykkane         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Using this requires inner div with id of 'notification-div'
export const Notification = async (elementID, content, type) => {
  // mode following C style return codes
  const ERROR = 1;
  const OK = 0; 

  // Find element --> exit if cannot
  const element = document.getElementById(elementID);
  if (!element) {
    console.log(`ERROR - Cannot find element with ID: ${elementID}`);
    return;
  }

  // set content --> message of the notification
  element.innerHTML = content;

  // Select error or success message, more could be added
  if (type === OK) {
    element.style.backgroundColor = 'var(--green)';
  }
  else if (type === ERROR) {
    element.style.backgroundColor = 'var(--pink)';
  }

  // Make notification appear and disappear
  element.style.opacity = '1';
  setTimeout(() => {
    element.style.opacity = '0';
  }, 5000);
}