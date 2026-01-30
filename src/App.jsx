import { useState } from 'react';
import { jsPDF } from 'jspdf';

const App = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    designation: '',
    joiningDate: '',
    relievingDate: '',
    employeeId: '',
    letterType: 'experience'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const generateExperienceLetter = () => {
    const doc = new jsPDF();
    
    // Add Logo
    const img = new Image();
    img.src = '/adshamper_logo-removebg-preview.png';
    doc.addImage(img, 'PNG', 20, 10, 30, 30);
    
    // Company Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('ADSHAMPER', 105, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Hooghly, West Bengal', 105, 33, { align: 'center' });
    doc.text('Email: support@adshamper.com | Phone: +91 9331156747', 105, 39, { align: 'center' });
    
    doc.line(20, 45, 190, 45);
    
    // Date
    doc.setFontSize(11);
    doc.text(`Date: ${formatDate(new Date())}`, 20, 55);
    
    // Title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EXPERIENCE CERTIFICATE', 105, 70, { align: 'center' });
    
    // Body
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const bodyText = [
      '',
      'To Whom It May Concern,',
      '',
      `This is to certify that ${formData.employeeName} (Employee ID: ${formData.employeeId})`,
      `worked with Adshamper as ${formData.designation} from ${formatDate(formData.joiningDate)}`,
      `to ${formatDate(formData.relievingDate)}.`,
      '',
      `During the tenure with us, ${formData.employeeName.split(' ')[0]} has shown dedication, professionalism,`,
      'and commitment towards work. We wish them all the best for future endeavors.',
      '',
      'We wish them success in all future undertakings.',
      '',
      '',
      '',
      '',
      'Sincerely,',
      '',
      '',
      '',
      '',
      '',
      '_______________________',
      'Authorized Signatory',
      'Adshamper',
      'Hooghly, West Bengal'
    ];
    
    let yPos = 85;
    bodyText.forEach(line => {
      doc.text(line, 20, yPos);
      yPos += 7;
    });
    
    doc.save(`Experience_Letter_${formData.employeeName.replace(/\s+/g, '_')}.pdf`);
  };

  const generateRelievingLetter = () => {
    const doc = new jsPDF();
    
    // Add Logo
    const img = new Image();
    img.src = '/adshamper_logo-removebg-preview.png';
    doc.addImage(img, 'PNG', 20, 10, 30, 30);
    
    // Company Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('ADSHAMPER', 105, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Hooghly, West Bengal', 105, 33, { align: 'center' });
    doc.text('Email: support@adshamper.com | Phone: +91 9331156747', 105, 39, { align: 'center' });
    
    doc.line(20, 45, 190, 45);
    
    // Date
    doc.setFontSize(11);
    doc.text(`Date: ${formatDate(new Date())}`, 20, 55);
    
    // Title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RELIEVING LETTER', 105, 70, { align: 'center' });
    
    // Body
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const bodyText = [
      '',
      'To Whom It May Concern,',
      '',
      `This is to certify that ${formData.employeeName} (Employee ID: ${formData.employeeId})`,
      `was employed with Adshamper as ${formData.designation} from ${formatDate(formData.joiningDate)}`,
      `to ${formatDate(formData.relievingDate)}.`,
      '',
      `${formData.employeeName.split(' ')[0]} has resigned from the services of the company and their last working`,
      `day was ${formatDate(formData.relievingDate)}. They have been relieved from all duties and`,
      'responsibilities with effect from the mentioned date.',
      '',
      `${formData.employeeName.split(' ')[0]} has cleared all dues and handed over all company property.`,
      'We wish them all the best for their future endeavors.',
      '',
      '',
      '',
      '',
      'Sincerely,',
      '',
      '',
      '',
      '',
      '',
      '_______________________',
      'Authorized Signatory',
      'Adshamper',
      'Hooghly, West Bengal'
    ];
    
    let yPos = 85;
    bodyText.forEach(line => {
      doc.text(line, 20, yPos);
      yPos += 7;
    });
    
    doc.save(`Relieving_Letter_${formData.employeeName.replace(/\s+/g, '_')}.pdf`);
  };

  const handleDownload = (e) => {
    e.preventDefault();
  
    if (formData.letterType === 'experience') {
      generateExperienceLetter();
    } else {
      generateRelievingLetter();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/adshamper_logo-removebg-preview.png"
              alt="Adshamper Logo"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Adshamper</h1>
              <p className="text-sm text-gray-600">Document Generator</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p className="font-semibold">Connect With Us</p>
            <p>support@adshamper.com</p>
            <p>+91 9331156747</p>
            <p>Hooghly, West Bengal</p>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <div className="max-w-3xl mx-auto p-6 mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Generate Your Document
          </h2>

          <form onSubmit={handleDownload} className="space-y-6">
            {/* Letter Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Document Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="letterType"
                    value="experience"
                    checked={formData.letterType === 'experience'}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-gray-700">Experience Letter</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="letterType"
                    value="relieving"
                    checked={formData.letterType === 'relieving'}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-gray-700">Relieving Letter</span>
                </label>
              </div>
            </div>

            {/* Employee Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Employee Name
              </label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter designation"
              />
            </div>

            {/* Employee ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter employee ID"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Relieving Date
                </label>
                <input
                  type="date"
                  name="relievingDate"
                  value={formData.relievingDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Download {formData.letterType === 'experience' ? 'Experience' : 'Relieving'} Letter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
