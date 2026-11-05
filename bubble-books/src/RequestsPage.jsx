import { PageIntro } from './DashboardComponents.jsx'
import { requestItems } from './dashboardData.js'

const requestFilters = ['All requests', 'Awaiting reply', 'Accepted', 'Completed']

function RequestsPage({ requestFilter, onRequestFilterChange, onRequest }) {
  const visibleRequests = requestItems.filter((request) => (
    requestFilter === 'All requests' || request.status === requestFilter
  ))

  return (
    <section className="page-section">
      <PageIntro eyebrow="Your bookish exchanges" title="My requests" description="Keep up with the stories you’ve asked for and the ones finding a new home." />
      <div className="request-tabs" role="group" aria-label="Filter requests">
        {requestFilters.map((filter) => (
          <button
            type="button"
            key={filter}
            className={requestFilter === filter ? 'is-active' : ''}
            aria-pressed={requestFilter === filter}
            onClick={() => onRequestFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="request-list">
        {visibleRequests.map((request) => (
          <article className="request-card" key={request.id}>
            <div className={`request-cover cover-${request.tone}`} aria-hidden="true"><span>♡</span></div>
            <div className="request-details">
              <span className={`request-status status-${request.status.toLowerCase().replace(' ', '-')}`}>{request.status}</span>
              <h2>{request.title}</h2>
              <p>by {request.author} <span>·</span> Shared by {request.owner}</p>
              <span className="request-note">{request.status === 'Accepted' ? 'Lovely news! Connect with the owner to plan your exchange.' : request.status === 'Completed' ? 'This little book adventure is complete.' : 'The owner will let you know when they’re ready.'}</span>
            </div>
            <button type="button" className="text-button request-view-button" onClick={() => onRequest(`“${request.title}” request details are a preview.`)}>
              View details <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
        {visibleRequests.length === 0 && <div className="empty-state"><span aria-hidden="true">♡</span><h2>No requests in this little pile</h2><p>Choose another filter to see your book exchanges.</p></div>}
      </div>
    </section>
  )
}

export default RequestsPage
