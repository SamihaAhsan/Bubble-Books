import { useEffect, useState } from 'react'
import { PageIntro } from './DashboardComponents.jsx'

const requestDirections = [
  { id: 'sent', label: 'Requests I sent' },
  { id: 'received', label: 'Requests sent to me' },
]
const requestCoverTones = ['plum', 'rose', 'blue']

function RequestsPage({ requestDirection, onRequestDirectionChange, onRequest }) {
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCurrentRequest = true

    async function loadRequests() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch('http://localhost:8080/myrequests', {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error(`Could not load requests (error ${response.status}).`)
        }

        const data = await response.json()
        if (
          !Array.isArray(data)
          || data.some((request) => !request.request_id || !['sent', 'received'].includes(request.direction))
        ) {
          throw new Error('The requests response has an unexpected format.')
        }

        if (isCurrentRequest) setRequests(data)
      } catch (requestError) {
        if (isCurrentRequest) {
          setError(requestError.message || 'Could not load requests.')
        }
      } finally {
        if (isCurrentRequest) setIsLoading(false)
      }
    }

    loadRequests()
    return () => {
      isCurrentRequest = false
    }
  }, [retryCount])

  const visibleRequests = requests.filter((request) => request.direction === requestDirection)

  return (
    <section className="page-section">
      <PageIntro eyebrow="Your bookish exchanges" title="My requests" description="Keep up with requests you’ve sent and requests for books you’re sharing." />
      <div className="request-tabs" role="group" aria-label="Requests">
        {requestDirections.map((direction) => (
          <button
            type="button"
            key={direction.id}
            className={requestDirection === direction.id ? 'is-active' : ''}
            aria-pressed={requestDirection === direction.id}
            onClick={() => onRequestDirectionChange(direction.id)}
          >
            {direction.label}
          </button>
        ))}
      </div>
      <div className="request-list">
        {isLoading ? (
          <p role="status">Loading your requests…</p>
        ) : error ? (
          <div role="alert">
            <p>{error}</p>
            <button type="button" className="text-button" onClick={() => setRetryCount((count) => count + 1)}>
              Try again
            </button>
          </div>
        ) : (
          <>
            {visibleRequests.map((request, index) => {
              const author = [request.author_first_name, request.author_last_name].filter(Boolean).join(' ')
              const otherUserId = request.direction === 'sent' ? request.account_posted_id : request.sent_id

              return (
                <article className="request-card" key={request.request_id}>
                  <div className={`request-cover cover-${requestCoverTones[index % requestCoverTones.length]}`} aria-hidden="true"><span>♡</span></div>
                  <div className="request-details">
                    <span className="request-status">{request.direction === 'sent' ? 'Sent' : 'Received'}</span>
                    <h2>{request.book_name}</h2>
                    <p>
                      {author && <>by {author} <span>·</span> </>}
                      {request.direction === 'sent' ? 'Requested from' : 'Requested by'} {otherUserId}
                    </p>
                  </div>
                  <button type="button" className="text-button request-view-button" onClick={() => onRequest(`“${request.book_name}” request details are a preview.`)}>
                    View details <span aria-hidden="true">→</span>
                  </button>
                </article>
              )
            })}
            {visibleRequests.length === 0 && <div className="empty-state"><span aria-hidden="true">♡</span><h2>No requests in this little pile</h2><p>There aren’t any {requestDirection === 'sent' ? 'requests you’ve sent' : 'requests sent to you'} yet.</p></div>}
          </>
        )}
      </div>
    </section>
  )
}

export default RequestsPage
