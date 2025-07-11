"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, Save, Bot, MessageCircle, CheckCircle } from "lucide-react"

// Mock data for available automations and posts
const availableAutomations = [
  { id: "auto_1", name: "Welcome New Followers", type: "DM Automation", status: "active" },
  { id: "auto_2", name: "Product Inquiry Bot", type: "Comment Reply", status: "active" },
  { id: "auto_3", name: "FAQ Responder", type: "Comment Reply", status: "active" },
  { id: "auto_4", name: "Support Ticket Creator", type: "DM Automation", status: "active" },
  { id: "auto_5", name: "Size Guide Helper", type: "Comment Reply", status: "draft" },
]

const availablePosts = [
  { id: "post_1", title: "Summer Collection Preview", type: "Feed Post", status: "published" },
  { id: "post_2", title: "Behind the Scenes", type: "Story", status: "published" },
  { id: "post_3", title: "Product Tutorial", type: "Reel", status: "draft" },
  { id: "post_4", title: "Customer Testimonials", type: "Feed Post", status: "scheduled" },
]

interface CreateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateCampaignModal({ isOpen, onClose }: CreateCampaignModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    budget: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    status: "draft",
  })
  const [selectedAutomations, setSelectedAutomations] = useState<string[]>([])
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])

  const handleSaveCampaign = () => {
    const campaignData = {
      ...formData,
      selectedAutomations,
      selectedPosts,
      budget: Number.parseFloat(formData.budget) || 0,
    }

    console.log("Creating new campaign:", campaignData)

    // Reset form and close modal
    setFormData({
      name: "",
      description: "",
      category: "",
      budget: "",
      startDate: undefined,
      endDate: undefined,
      status: "draft",
    })
    setSelectedAutomations([])
    setSelectedPosts([])
    onClose()
  }

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      budget: "",
      startDate: undefined,
      endDate: undefined,
      status: "draft",
    })
    setSelectedAutomations([])
    setSelectedPosts([])
    onClose()
  }

  const toggleAutomation = (automationId: string) => {
    setSelectedAutomations((prev) =>
      prev.includes(automationId) ? prev.filter((id) => id !== automationId) : [...prev, automationId],
    )
  }

  const togglePost = (postId: string) => {
    setSelectedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-600" />
            Create New Campaign
          </DialogTitle>
          <DialogDescription>Set up a new marketing campaign with automations and content</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>Configure the basic settings for your campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="campaignName">Campaign Name *</Label>
                  <Input
                    id="campaignName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                    placeholder="e.g., Summer Collection Launch"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1"
                    rows={3}
                    placeholder="Describe your campaign goals and strategy..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Product Launch">Product Launch</SelectItem>
                        <SelectItem value="Sales Event">Sales Event</SelectItem>
                        <SelectItem value="Customer Service">Customer Service</SelectItem>
                        <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
                        <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="mt-1"
                      placeholder="5000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full mt-1 justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => setFormData({ ...formData, startDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>End Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full mt-1 justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => setFormData({ ...formData, endDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assign Automations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  Assign Automations
                </CardTitle>
                <CardDescription>Select automation rules to include in this campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableAutomations.map((automation) => (
                    <div
                      key={automation.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedAutomations.includes(automation.id)
                          ? "border-purple-300 bg-purple-50"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => toggleAutomation(automation.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedAutomations.includes(automation.id)
                              ? "bg-gradient-to-r from-purple-100 to-pink-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <Bot
                            className={`w-4 h-4 ${
                              selectedAutomations.includes(automation.id) ? "text-purple-600" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{automation.name}</p>
                          <p className="text-xs text-gray-500">{automation.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            automation.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                          }
                        >
                          {automation.status}
                        </Badge>
                        {selectedAutomations.includes(automation.id) && (
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assign Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  Assign Posts
                </CardTitle>
                <CardDescription>Select posts and content to include in this campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availablePosts.map((post) => (
                    <div
                      key={post.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPosts.includes(post.id) ? "border-purple-300 bg-purple-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => togglePost(post.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedPosts.includes(post.id)
                              ? "bg-gradient-to-r from-blue-100 to-cyan-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <MessageCircle
                            className={`w-4 h-4 ${selectedPosts.includes(post.id) ? "text-blue-600" : "text-gray-400"}`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{post.title}</p>
                          <p className="text-xs text-gray-500">{post.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            post.status === "published"
                              ? "bg-green-100 text-green-700"
                              : post.status === "scheduled"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }
                        >
                          {post.status}
                        </Badge>
                        {selectedPosts.includes(post.id) && <CheckCircle className="w-5 h-5 text-purple-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            {/* Campaign Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Campaign Preview</CardTitle>
                <CardDescription className="text-xs">How your campaign will appear</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-700">Campaign Name:</p>
                  <p className="text-sm text-gray-900">{formData.name || "Untitled Campaign"}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-700">Category:</p>
                  <p className="text-sm text-gray-900">{formData.category || "Not selected"}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-700">Budget:</p>
                  <p className="text-sm text-gray-900">
                    {formData.budget ? `$${Number.parseFloat(formData.budget).toLocaleString()}` : "Not set"}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-700">Duration:</p>
                  <p className="text-sm text-gray-900">
                    {formData.startDate && formData.endDate
                      ? `${Math.ceil(
                          (formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24),
                        )} days`
                      : "Not set"}
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs font-medium text-purple-700">Selected Items:</p>
                  <p className="text-sm text-purple-900 mt-1">
                    {selectedAutomations.length} Automations, {selectedPosts.length} Posts
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Campaign Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Initial Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Auto-start</p>
                    <p className="text-xs text-gray-500">Start automatically on start date</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-gray-500">Get updates about campaign performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={handleSaveCampaign}
                disabled={!formData.name || !formData.category || !formData.startDate || !formData.endDate}
              >
                <Save className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
