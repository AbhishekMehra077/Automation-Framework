// utils/RandomDataUtil.js
// Random Data Generation Utility

class RandomDataUtil {
  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomEmail() {
    const randomPart = this.generateRandomString(8);
    const timestamp = Date.now();
    return `test_${randomPart}_${timestamp}@orangehrm-test.com`;
  }

  static generateRandomPhone() {
    let phone = '';
    for (let i = 0; i < 10; i++) {
      phone += Math.floor(Math.random() * 10);
    }
    return phone;
  }

  static generateRandomEmployeeId() {
    const random = Math.floor(Math.random() * 10000);
    return `EMP${random.toString().padStart(6, '0')}`;
  }

  static generateRandomUsername() {
    const firstname = this.generateRandomString(6);
    const lastname = this.generateRandomString(6);
    return `${firstname.toLowerCase()}.${lastname.toLowerCase()}`;
  }

  static generateRandomPassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  static generateRandomDate(startDate = new Date(2020, 0, 1), endDate = new Date()) {
    return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  }

  static formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  }

  static generateRandomFirstName() {
    const names = ['John', 'Jane', 'Michael', 'Sarah', 'Robert', 'Emma', 'David', 'Olivia', 'James', 'Sophia'];
    return names[Math.floor(Math.random() * names.length)];
  }

  static generateRandomLastName() {
    const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    return names[Math.floor(Math.random() * names.length)];
  }
}

module.exports = RandomDataUtil;
