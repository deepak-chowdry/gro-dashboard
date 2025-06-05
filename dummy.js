grievance: {
    category: 'Road Repair',
    cpgrams_category: 'Housing and Urban Affairs > DDA (Delhi Development Authority) > Civic Issues (Development Areas only) > Road Repair/Road related maintenance',
    created_at: '2025-05-24T04:54:46.34Z',
    description: 'Grievance Details:\n' +
      'Personal Information:\n' +
      '- Location: Kundalahalli Colony, Bangalore Urban\n' +
      '- Specific Area: Road connecting 2nd Main Street to Ring Road\n' +
      '\n' +
      'Road Condition Issues:\n' +
      '- Type of Road Damage: Severely damaged road surface\n' +
      '- Severity: Severe\n' +
      '- Impact on Public Safety: Critical safety hazard\n' +
      '  * Approximately 2-3 accidents occurring daily for the past week\n' +
      '  * Road becomes extremely dangerous during rainy conditions\n' +
      '\n' +
      'Additional Concerns:\n' +
      '- Lack of proper street lighting\n' +
      '- Road is currently not usable\n' +
      '\n' +
      'Urgent Request:\n' +
      'Immediate road repair and installation of street lights are required to prevent further accidents and ensure public safety.',
    grievance_received_date: '2025-05-24T04:54:46.34Z',
    id: 'rec_d0ol25kpthipp3sikfbg',
    priority: 'high',
    reformed_flag: false,
    status: 'pending',
    title: 'Severe Road Damage and Safety Hazards in Kundalahalli Colony, Bangalore',
    updated_at: '2025-05-24T04:54:46.34Z',
    user_id: { id: 'rec_d0jieo7jkah57cl384i0' },
    xata: {
      createdAt: '2025-05-24T04:54:46.439594Z',
      updatedAt: '2025-05-24T04:54:46.439594Z',
      version: 0
    }
  }
  



      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
                                      <DialogTrigger asChild>
                                          <Button className="bg-black hover:bg-gray-800 text-white">
                                              <Upload className="w-4 h-4 mr-2" />
                                              Upload File
                                          </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-md">
                                          <DialogHeader>
                                              <DialogTitle>Upload Document</DialogTitle>
                                              <p className="text-sm text-gray-600">Upload documents to the case</p>
                                          </DialogHeader>
                                          <div className="space-y-4">
                                              <div>
                                                  <label className="text-sm font-medium text-gray-700 mb-2 block">Select Files</label>
                                                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                                                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                                                      <p className="text-gray-600 mb-2">Drag & drop files here or click to browse</p>
                                                      <p className="text-sm text-gray-500">Upload one or more files</p>
                                                  </div>
                                              </div>
                                              <div className="flex justify-end gap-2">
                                                  <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                                                      Cancel
                                                  </Button>
                                                  <Button className="bg-gray-600 hover:bg-gray-700">
                                                      <Upload className="w-4 h-4 mr-2" />
                                                      Upload
                                                  </Button>
                                              </div>
                                          </div>
                                      </DialogContent>
                                  </Dialog>
  